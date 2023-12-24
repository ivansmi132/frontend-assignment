import "./footer-styles.css";

export function Footer() {
    return (
        <div>
            <div className={"footer-container"}>
                <div className={"footer-content"}>
                    <h1>Personally Newsletter</h1>
                    <p>A bi-weekly newsletter of design inspiration, resources and anything related to career
                        development.</p>
                    <div className={"email-input"}>
                        <input type={"text"} placeholder={"Email address"}/>
                        <button className={"sign-button"}>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className={"copyright-container"}>
                <p>Copyright 2023</p>
            </div>
        </div>
    )
}