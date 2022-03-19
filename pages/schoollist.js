import Layout from "../layout";
import Table from "../table/table";

export default function TableList({ data, column }) {
  let column = [
    { data: "text", dataFeild: "user_name" },
    { data: "number", dataFeild: "phone_number" },
    { data: "number", dataFeild: "email_id" },
    { data: "text", dataFeild: "action" },
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">school list</h1>
      <table className="shadow-2xl shadow-cyan-500/50 md:table-fixed w-fit p-10 text-sm hover:border-collapse border border-slate-400">
        <thead className="border-b-2 border-neutral-300">
          <tr>
            {
              column.map(c => <headers column={column}/>)
            }
          </tr>
        </thead>
        <tbody className=" border-b-2 border-neutral-300">
          {

            data?.map(col, i => <Table
              key={col.i}
              tableData={data}
            ></Table>)

          }
        </tbody>
      </table>
    </Layout>
  );
}


const headers = ({column}) => {
  return (
    <>
      <th>{column.dataFeild}</th>

    </>
  )
}