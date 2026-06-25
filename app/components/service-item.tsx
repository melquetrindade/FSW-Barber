"use client"

import {BarbershopService} from '../../prisma/generated/client'
import Image from 'next/image'
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

interface ServiceItemProps {
    service: BarbershopService
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

const ServiceItem = ({service} :  ServiceItemProps) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string | undefined) => {
        setSelectedTime(time)
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
                            <SheetContent className='px-0'>
                                <SheetHeader>
                                    <SheetTitle className="text-center font-bold text-lg">Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className='px-5 pb-4 border-b border-solid'>
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
                                    <div className='px-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2'>
                                        {TIME_LIST.map((time) => (
                                            <Button 
                                                variant={selectedTime === time ? 'default' : 'outline'}
                                                className='rounded-full'
                                                onClick={() => handleTimeSelect(time)}
                                            >{time}</Button>
                                        ))}
                                    </div>
                                )}
                                
                            </SheetContent>
                        </Sheet>
                        
                    </div>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default ServiceItem;