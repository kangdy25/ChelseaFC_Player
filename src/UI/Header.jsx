export default function Header() {
    return (
        <header className="header bg-radial-eclipse-bottom flex flex-col h-screen w-[200px] justify-between items-center fixed top-0 left-0 font-serif text-customSkyblue font-normal
        md:relative md:w-full md:h-[100px] md:flex-row md:justify-start md:items-stretch
        sm:flex-col sm:w-full sm:h-[190px] sm:items-center sm:relative 
        ">
            <img src="/img/Logo.webp" alt="logo" className="mt-6 w-[150px]
            md:mt-0 md:w-[100px] sm:w-[100px] sm:mt-5"/>
            <h1 className="leading-normal text-2xl px-2.5 pl-5 mb-36
            md:flex md:w-screen md:pr-24 md:justify-center md:items-center md:mb-0 sm:pr-0">
                Chelsea FC Player Data
            </h1>
            <p className="text-center pb-5 md:hidden sm:hidden">
                " Pride of London "
            </p>
        </header>
    )
}