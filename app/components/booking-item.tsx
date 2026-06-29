import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Booking, Prisma } from "@/prisma/generated/client"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {service: true}}>
}

const BookingItem = ({booking}: BookingItemProps) => {
    return(
        <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
            </h2>

            <Card >
                <CardContent className="flex justify-between">
                    
                    {/*Esquerda */}
                    <div className="flex flex-col gap-2 py-5 pl-5">
                    <Badge className="w-fit rounded-xl">Confirmado</Badge>
                    <h3 className="font-bold">{booking.service.name}</h3>

                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                        <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
                        </Avatar>
                        <p className="text-sm">Barbearia FSW</p>
                    </div>
                    </div>

                    {/*Direita */}
                    <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                    <p className="text-sm">Junho</p>
                    <p className="text-2xl">18</p>
                    <p className="text-sm">15:00</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default BookingItem