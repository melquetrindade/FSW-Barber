"use client"

import {Barbershop, BarbershopService, Booking} from '../../prisma/generated/client'
import Image from 'next/image'
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle} from './ui/sheet';
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { format, isPast, isToday, set } from 'date-fns';
import { createBooking } from '../_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { getBookings } from '../_actions/get-booking';
import { Dialog, DialogContent } from './ui/dialog';
import SignInDialog from './sign-in-dialog';

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
]

const getTimeList = (bookings: Booking[], selectedDay: Date) => {
    // TODO: Não exibir horários no passado
    const timeList = TIME_LIST.filter(time => {
        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])

        // Essa constante verifica se a hora e os minutos estão no passado
        const timeIsOnThePast = isPast(set(new Date(), {hours: hour, minutes: minutes}))
        if(timeIsOnThePast && isToday(selectedDay)){
            return false
        }

        // verifica sem tem reserva no horário atual
        if(bookings.some(booking => booking.date.getHours() === hour && booking.date.getMinutes() === minutes)){
            return false
        }
        return true
    })
    return timeList
}

const ServiceItem = ({service, barbershop} :  ServiceItemProps) => {
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const {data} = useSession() // Esta função trás dados do usuário logado
    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

    //console.log(service.barbershopId)

    useEffect(() => {
        const fetch = async () => {
            if(!selectedDay) return
            // Função retorna os horários disponíveis para todas as barbearias
            // Porém tem que ser de uma barbearia em específico
            // Então tenho que passar para o getBookings além do date e do serviceId o Id da barbearia
            // para ele pegar os horários só daquela barbearia
            const bookings = await getBookings({date: selectedDay, serviceId: service.id})
            setDayBookings(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    const handleBookingSheetOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBookings([])
        setBookingSheetIsOpen(false)
    }

    const handleBookingClick = () => {
        if(data?.user){
            return setBookingSheetIsOpen(true)
        }
        return setSignInDialogIsOpen(true)
    }

    //console.log("agendamentos:", dayBookings);

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
                date: newDate
            })
            handleBookingSheetOpenChange()
            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Error ao criar reserva!")
        }
    }


    const timeList = useMemo(() => {
        if (!selectedDay) return []
        return getTimeList(dayBookings, selectedDay)
    }, [dayBookings, selectedDay])

    return (
        <>
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

                            <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChange}>
                                
                                <Button 
                                    onClick={handleBookingClick}
                                    variant='secondary' 
                                    size='sm'>Reservar</Button>
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
                                                disabled={{before: new Date()}}
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
                                                {timeList.length > 0 ? timeList.map((time) => (
                                                    <Button 
                                                        key={time}
                                                        variant={selectedTime === time ? 'default' : 'outline'}
                                                        className='rounded-full'
                                                        onClick={() => handleTimeSelect(time)}
                                                    >{time}</Button>
                                                )) : 
                                                    <p className='text-xs'>Não há horários disponíveis para este dia.</p>
                                                }
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
                                        <Button disabled={!selectedDay || !selectedTime} onClick={handleCreateBooking}>Confirmar</Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                            
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
                <DialogContent className='w-[90%]'>
                    <SignInDialog/>
                </DialogContent>
            </Dialog>
        </>
     );
}
 
export default ServiceItem;