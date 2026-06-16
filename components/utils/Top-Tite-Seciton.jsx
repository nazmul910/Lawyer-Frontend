export default function TopTitleSection({title,subtitle,description}) {
    return(
        <>
            <div className="flex justify-between items-end">
                <div className="">
                    <p>{subtitle}</p>
                    <h2>{title}</h2>
                </div>
                <div>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}
