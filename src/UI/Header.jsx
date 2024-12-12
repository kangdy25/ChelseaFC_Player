export default function Header() {
    return (
        <header className="header bg-radial-eclipse-bottom flex flex-col h-screen w-[200px] justify-between items-center fixed top-0 left-0 
        md:relative md:w-full md:h-[100px] md:flex-row md:justify-start md:items-stretch
        sm:flex-col sm:w-full sm:h-[190px] sm:items-center sm:relative 
        ">
            <img src="/img/Logo.webp" alt="" className="mt-[25px] w-[150px]
            md:mt-0 md:w-[100px] sm:w-[100px] sm:mt-[20px]"/>
            <h1 className="font-serif font-normal text-customSkyblue leading-[1.4] text-[24px] p-[10px] pl-[20px] mb-[150px]
            md:flex md:w-screen md:pr-[100px] md:justify-center md:items-center md:mb-0 sm:pr-0">
                Chelsea FC Player Data
            </h1>
            <p className="font-serif text-center text-customSkyblue pb-[20px] md:hidden sm:hidden">
                " Pride of London "
            </p>
        </header>
    )
}