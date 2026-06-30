import { Button } from "./components/ui/button"
import Header from "./components/header"
import Image from "next/image"
import { db } from './_lib/prisma'
import BarberShopItem from "./components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"


const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  const bookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  }) : []

  return (
    <div>
      <Header/>
      <div className="m-3">
        <div className="p-2">
          <h2 className="text-xl font-bold">Olá, {session?.user ? session.user.name : 'bem-vindo'}!</h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", {locale: ptBR})}
            </span>
            {" "}de{" "}
            <span className="capitalize">
              {format(new Date(), "MMMM", {locale: ptBR})}
            </span>
            </p>
        </div>

        {/*Busca */}
        <div className="mt-4">
          <Search/>
        </div>
        
        {/*Busca rápida */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((options) => (
            <Button asChild className="gap-2" variant='secondary' key={options.title}>
              <Link href={`/barbershops?service=${options.title}`}>
                    <Image alt={options.title} src={options.imageURL} height={18} width={18}/>
                {options.title}
                </Link>
            </Button>
          ))}
        </div>

        {/*Imagem */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt='banner' src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>

        {/*Agendamentos  */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="gap-3 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map(booking => (
            <BookingItem key={booking.id} booking={booking}/>
          ))}
        </div>
        
        {/*Recomendados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>

        {/*Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            popularBarbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>
        
      </div>
    </div>
    
  )
}

export default Home
