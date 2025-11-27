from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np

class ScivocabEmbeddingService:
    def __init__(self, model_name="allenai/scibert_scivocab_uncased", device=None):
        self.model_name = model_name
        self.device = device if device else ("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModel.from_pretrained(self.model_name)
        self.model.to(self.device)
        self.model.eval()

    def generate_embeddings(self, text: str, max_length: int = 512) -> list:
        # Retourne une liste du vecteur
        if not text:
            return np.zeros(768).tolist()
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=max_length
        )

        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.model(**inputs)
        last_hidden = outputs.last_hidden_state 
        mask = inputs.get("attention_mask", None)
        if mask is not None:
            mask = mask.unsqueeze(-1).expand(last_hidden.size()).float()
            summed = torch.sum(last_hidden * mask, 1)
            counts = torch.clamp(mask.sum(1), min=1e-9)
            mean_pooled = summed / counts
        else:
            mean_pooled = last_hidden.mean(dim=1)
        vec = mean_pooled.squeeze().cpu().numpy()
        return vec.tolist()
