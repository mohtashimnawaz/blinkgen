export default function PreviewCard() {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-md" />
        <div>
          <h3 className="text-lg font-semibold">Preview</h3>
          <p className="text-slate-600">URL preview and CTA will appear here when you fill the form.</p>
        </div>
      </div>
    </div>
  )
}
