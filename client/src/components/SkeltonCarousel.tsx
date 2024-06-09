

const SkeletonCarousel = () => {
    return (
        <div className="w-full grid xs:gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="w-full h-64 bg-slate-100 border border-slate-100 shadow animate-pulse" />
            <div className="w-full h-64 bg-slate-100 border border-slate-100 shadow animate-pulse hidden xs:flex" />
            <div className="w-full h-64 bg-slate-100 border border-slate-100 shadow animate-pulse hidden sm:flex" />
            <div className="w-full h-64 bg-slate-100 border border-slate-100 shadow animate-pulse hidden md:flex" />
            <div className="w-full h-64 bg-slate-100 border border-slate-100 shadow animate-pulse hidden lg:flex" />
        </div>
        )
}

export default SkeletonCarousel