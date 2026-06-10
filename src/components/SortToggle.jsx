function SortToggle({ sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold">Latest Venture Funding Rounds</h2>

        <p className="mt-1 text-xs text-slate-500">
          Timeline view ordered by article release timestamps.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-center bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-sm">
        <span
          className={`text-xs font-bold transition-colors duration-200 ${
            sortOrder ? "text-slate-900" : "text-slate-400 font-medium"
          }`}
        >
          Oldest First
        </span>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={!sortOrder}
            onChange={() => setSortOrder((prev) => !prev)}
            className="peer sr-only"
          />

          <div className="h-6 w-11 rounded-full bg-white border border-slate-200 shadow-inner transition-all duration-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-indigo-600 after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
        </label>

        <span
          className={`text-xs font-bold transition-colors duration-200 ${
            !sortOrder ? "text-slate-900" : "text-slate-400 font-medium"
          }`}
        >
          Newest First
        </span>
      </div>
    </div>
  );
}

export default SortToggle;
