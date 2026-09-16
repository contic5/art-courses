
function CourseElement(props: any)
{
    let course=props.course;

    return (<>
    <div className="row">
    <div className="col border outer_cell">
    <h3>{course["Course"]}</h3>
    <h4>By {course["Provider"]}</h4>
    <p><a href={course["Link"]}>{course["Link"]}</a></p>
    <p>{course["Description"]}</p>
    
    {
    /*
    <div className="container inner_cell">
    <div className="row">
    <div className="col border">Length: {course["Hours"]} Hours</div>
    <div className="col border">Cost: {course["Cost"]}</div>
    <div className="col border">Level: {course["Level"]}</div>
    </div>
    </div>
    */
    }

    <table className="table">
    <thead>
    <tr>
    <th scope="col">Length</th>
    <th scope="col">Cost</th>
    <th scope="col">Level</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>{course["Hours"]} {course["Hours"]==1?"Hour":"Hours"}</td>
    <td>{course["Cost"]}</td>
    <td>{course["Level"]}</td>
    </tr>
    </tbody>
    </table>

    </div>
    </div>
    </>);
}
export default(CourseElement)