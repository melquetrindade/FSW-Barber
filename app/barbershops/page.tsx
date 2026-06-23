import { db } from "../_lib/prisma";
import BarberShopItem from "../components/barbershop-item";
import Header from "../components/header";
import Search from "../components/search";

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({searchParams}: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive"
            }
        }
    })

    return (
        <div>
            <Header/>
            <div className="my-6 px-5">
                <Search/>
            </div>
            
            <div className="px-5 mb-3">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    {`Resultados para "${searchParams.search}"`}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                        <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default BarbershopsPage;