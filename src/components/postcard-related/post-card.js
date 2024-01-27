import "./post-card-styles.css";
import {Link} from "react-router-dom";

export function PostCard ({postData}) {
    const {date, title, image_url} = postData;

    return (
        <>
            <div className={"post-container"}>
                <div className={"post-info"}>
                    <h5 className={"date"} >{date}</h5>
                    <h2>{title}</h2>
                    <Link to={`/posts/${postData.id}`} className={"card-link"} onClick= {() => window.scrollTo(0, 0)}>see More</Link>
                </div>
                <div>
                    {image_url && <img src={image_url} alt={'post'}/>}
                </div>
            </div>
        </>
    )
}