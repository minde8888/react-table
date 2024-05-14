
export const ColumnFilter = ({ column }: any) => {
    const { filterValue, setFilter } = column
    
    return (
        <span>
            Search:{''}
            <input value={filterValue || ""} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}