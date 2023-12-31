import "./post-card-styles.css";
import {Link} from "react-router-dom";
import {SinglePostMenu} from "./single-post-menu";
export function PostCard ({postData}) {
    const {date, title, body, image} = postData;

    return (
        <>
        <div className={"post-container"}>
            <div className={"post-info"}>
                <h5 className={"date"} >{date}</h5>
                <h2>{title}</h2>
                <p>{image ? (body.slice(0,190) + " ..") : (body.slice(0, 500) + " ..")}</p>
                <Link to={`/posts/${postData.id}`} className={"card-link"} onClick= {() => window.scrollTo(0, 0)}>see More</Link>
            </div>
            <div>
                {image && <img src={URL.createObjectURL(image)} alt={'post'}/>}
            </div>
        </div>

        <div>
            <SinglePostMenu post={postData}/>
        </div>
        </>
    )
}