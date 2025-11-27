import nltk
import re
from collections import Counter
from sklearn.metrics.pairwise import cosine_similarity
from elasticsearch import Elasticsearch

nltk.download("punkt")
nltk.download("punkt_tab")


# -----------------------------------------------------------
#   Classe de traitement de texte
# -----------------------------------------------------------
class TextProcessingService:

    def __init__(self, embedder):
        self.embedder = embedder

    # -------------------------------------------------------
    #   Trouver la phrase la plus similaire
    # -------------------------------------------------------
    def extract_best_sentence(self, article_text, query_vec):
        if not article_text:
            return "Aucune phrase disponible.", 0.0

        sentences = nltk.sent_tokenize(article_text)
        if not sentences:
            return "Aucune phrase détectée.", 0.0

        best_sentence = None
        best_score = -1

        for sentence in sentences:
            try:
                sent_vec = self.embedder.generate_embeddings(sentence)
                score = cosine_similarity([query_vec], [sent_vec])[0][0]

                if score > best_score:
                    best_score = score
                    best_sentence = sentence

            except:
                continue

        return best_sentence, best_score

    # -------------------------------------------------------
    #   Extraction de mots-clés par fréquence
    # -------------------------------------------------------
    @staticmethod
    def extract_keywords(text, top_n=15):
        if not text:
            return []

        words = re.findall(r"\b\w+\b", text.lower())
        words = [w for w in words if len(w) > 3]

        counter = Counter(words)
        most_common = counter.most_common(top_n)

        return [w for w, _ in most_common]

    # -------------------------------------------------------
    #   Construction d’une query Elasticsearch vector + filter
    # -------------------------------------------------------
    @staticmethod
    def build_es_query(query_vec=None, author=None, year=None, size=50):
        filters = []

        if author:
            filters.append({"match": {"authors": author}})
        if year:
            filters.append({"term": {"year": year}})

        # -----------------------------
        # CAS 1 : recherche classique SANS vecteur
        # -----------------------------
        if query_vec is None:
            return {
                "size": size,
                "query": {
                    "bool": {
                        "must": {"match_all": {}},
                        "filter": filters
                    }
                }
            }

        # -----------------------------
        # CAS 2 : recherche vectorielle AVEC script_score
        # -----------------------------
        return {
            "size": size,
            "query": {
                "script_score": {
                    "query": {
                        "bool": {
                            "must": {"match_all": {}},
                            "filter": filters
                        }
                    },
                    "script": {
                        "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                        "params": {"query_vector": query_vec}
                    }
                }
            }
        }

