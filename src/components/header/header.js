import "./header-styles.css";

export function Header({children, maintext, subtext}) {
    return (
        <div className={"header-container"}>
            <div className={"header"}>
                {children}
                <h1>{maintext}</h1>
                <h2>{subtext}</h2>
            </div>
        </div>
    )
}