import { useState } from "react"
import { useAsyncDebounce } from "react-table"

//filter, setFilter
export const ColumnFilter = ({ column }: any) => {
    const { filterValue, setFilter } = column
    const [value, setValue] = useState(filterValue)

    const onChanges = useAsyncDebounce(value =>{
        setValue(value || undefined)
    }, 1000)


    return (
        <span>
            Search:{''}
            <input value={value || ""} onChange={(e) => {
                setFilter(e.target.value)
                onChanges(e.target.value)
            }} />
        </span>
    )
}