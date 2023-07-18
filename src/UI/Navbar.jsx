export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="Navbar__dropbox">
                <select name="Season">
                    <option value="">2023-2024</option>
                    <option value="학생">2024-2025</option>
                </select>
            </div>
            <div className="Navbar__sort">
                <ul>
                    <li><a href="">GoalKeeper</a></li>
                    <li><a href="">Defender</a></li>
                    <li><a href="">Midfielder</a></li>
                    <li><a href="">Forward</a></li>
                </ul>
            </div>
        </div>
    )
}