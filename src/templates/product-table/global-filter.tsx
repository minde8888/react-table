
export const GlobalFilter = ({ filter, setFilter }: any) => {
    return (
        <span>
            Search:{''}
            <input value={filter || ""} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}