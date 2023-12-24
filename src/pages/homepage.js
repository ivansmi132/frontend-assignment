import {Header} from "../components/header/header";

function MeetButton () {
    return (
        <div className={"meet-button-container"}>
            <p>👋 Meet Personally</p>
        </div>
    )
}


export function Homepage() {
    return (
        <>
        <Header maintext={"Welcome!"} subtext={"Have a great time!"}>
            <MeetButton />
        </Header>
            <hr />
        </>

    )
}
