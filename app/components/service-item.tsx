"use client"

import {Barbershop, BarbershopService, Booking} from '../../prisma/generated/client'
import Image from 'next/image'
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { format, set } from 'date-fns';
import { createBooking } from '../_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { getBookings } from '../_actions/get-booking';

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
]

const ServiceItem = ({service, barbershop} :  ServiceItemProps) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const {data} = useSession() // Esta função trás dados do usuário logado
    const [dayBookings, setDayBookings] = useState<Booking[]>([])

    useEffect(() => {
        const fetch = async () => {
            if(!selectedDay) return
            const bookings = await getBookings({date: selectedDay, serviceId: service.id})
            setDayBookings(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    console.log("agendamentos:", dayBookings);

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string | undefined) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        // 1. Não exibir horários que já foram agendados
        // 2. Salvar o agendamento para o usuário logado
        // 3. Não exibir o botão de "Reservar" se o usuário não estiver logado
        try{
            if(!selectedDay || !selectedTime){
                return
            }
            const hour = Number(selectedTime.split(":")[0])
            const minute = Number(selectedTime.split(":")[1])
            const newDate = set(selectedDay, {
                minutes: minute,
                hours: hour
            })

            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate
            })
            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Error ao criar reserva!")
        }
    }

    return (
        <Card className="ring-0">
            <CardContent  className='flex items-center gap-3 p-3'>
                {/*Imagem */}
                <div className='relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]'>
                    <Image alt={service.name} src={service.imageURL} fill className='object-cover rounded-lg'/>
                </div>

                {/*Direita */}
                <div className='space-y-2'>
                    <h3 className='font-semibold text-sm'>{service.name}</h3>
                    <p className='text-sm text-gray-400'>{service.description}</p>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm font-bold text-primary'>
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}
                        </p>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant='secondary' size='sm'>Reservar</Button>
                            </SheetTrigger>
                            <SheetContent className='px-0 flex h-full flex-col'>
                                <SheetHeader>
                                    <SheetTitle className="text-center font-bold text-lg">Fazer Reserva</SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                                    <div className='px-5 pb-4'>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            locale={ptBR}
                                            className='rounded-2xl'
                                            classNames={{
                                                weekday: "flex-1 capitalize",
                                                day: "flex-1",
                                                month_caption: "flex justify-center items-center text-center capitalize",
                                                button_previous: "h-8 w-8",
                                                button_next: "h-8 w-8",
                                            }}
                                            />
                                    </div>
                                    
                                    {selectedDay && (
                                        <div className='py-4 border border-solid px-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2'>
                                            {TIME_LIST.map((time) => (
                                                <Button 
                                                    variant={selectedTime === time ? 'default' : 'outline'}
                                                    className='rounded-full'
                                                    onClick={() => handleTimeSelect(time)}
                                                >{time}</Button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {selectedTime && selectedDay && (
                                        <div className='p-5'>
                                            <Card>
                                                <CardContent className='p-3 space-y-3'>
                                                    <div className='flex items-center justify-between'>
                                                        <h2 className='font-bold'>{service.name}</h2>
                                                        <p className='text-sm font-bold'>
                                                            {Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            }).format(Number(service.price))}
                                                        </p>
                                                    </div>

                                                    <div className='flex items-center justify-between'>
                                                        <h2 className='text-sm text-gray-400'>Data</h2>
                                                        <p className='text-sm'>
                                                            {format(selectedDay, "d 'de' MMMM", {
                                                                locale: ptBR,
                                                            })}
                                                        </p>
                                                    </div>

                                                    <div className='flex items-center justify-between'>
                                                        <h2 className='text-sm text-gray-400'>Horário</h2>
                                                        <p className='text-sm'>
                                                            {selectedTime}
                                                        </p>
                                                    </div>

                                                    <div className='flex items-center justify-between'>
                                                        <h2 className='text-sm text-gray-400'>Barbearia</h2>
                                                        <p className='text-sm'>
                                                            {barbershop.name}
                                                        </p>
                                                    </div>

                                                    
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                </div>
                                <SheetFooter className='px-5'>
                                    <SheetClose asChild>
                                        <Button disabled={!selectedDay || !selectedTime} onClick={handleCreateBooking}>Confirmar</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        
                    </div>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default ServiceItem;