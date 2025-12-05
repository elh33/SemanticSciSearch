{/* Separator bar with result count */}
{hasSearched && !isLoading && (
  <div style={{ 
    borderBottom: '1px solid #dfe1e5',
    backgroundColor: '#f8f9fa',
    padding: '12px 0'
  }}>
    <div className="max-w-4xl mx-auto px-4" style={{ paddingLeft: '10px' }}>
      <p className="text-sm text-gray-600">
        About {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
    </div>
  </div>
)}

{/* Main content */}
<div className="max-w-4xl mx-auto px-4 py-6">
  {/* ... reste du code ... */}
</div>

{/* Footer */}
<footer className="mt-12 border-t border-gray-200" style={{ backgroundColor: '#0a2540' }}>
  <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm" style={{ color: '#17a2b8' }}>
    SemanticSciSearch - Semantic search for scientific articles in AI and Medicine
  </div>
</footer>