//import { Button } from "bootstrap";
import SchoolList from "../pages/schoollist";
const Table = (props) => {
    const {a,b,c,d} = props.data;

    return (
        <>
            <tr>
                <td>{a}</td>
                <td>{b}</td>
                <td>{c}</td>
                <td>{d}</td>
            </tr>

        </>
    )
}
export default Table;