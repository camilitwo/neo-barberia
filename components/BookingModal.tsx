'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format, addDays } from 'date-fns';
import { barbersData, type Barber } from '@/data/barbers';
import type { TimeSlot } from '@/types/booking';
import 'react-day-picker/dist/style.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceOption {
  name: string;
  price: string;
  description: string;
  includes?: string[];
  tag?: string;
}

const services: ServiceOption[] = [
  {
    name: 'Corte Clásico',
    price: '$8.000',
    description:
      'Un corte limpio y preciso con navaja y tijera, ideal para mantener un estilo prolijo y elegante.',
    includes: ['Asesoría de estilo personalizada', 'Finalizado con productos premium'],
  },
  {
    name: 'Fade Moderno',
    price: '$10.000',
    description:
      'Degradados perfectos con transiciones suaves que realzan la forma de tu rostro y destacan tu look.',
    includes: ['Definición de contornos', 'Aplicación de tónicos y peinado'],
    tag: 'Popular',
  },
  {
    name: 'Corte + Barba',
    price: '$14.000',
    description:
      'Pack completo para renovar tu imagen con corte, perfilado y cuidado de barba con aceites y toalla caliente.',
    includes: ['Toalla caliente', 'Aceite de barba y bálsamo', 'Definición con navaja'],
    tag: 'Pack',
  },
  {
    name: 'Afeitado Clásico',
    price: '$9.000',
    description:
      'Ritual tradicional con shavette, toallas calientes y espuma caliente para una afeitada suave y sin irritación.',
    includes: ['Toallas calientes', 'After shave calmante'],
  },
  {
    name: 'Diseño Capilar',
    price: '$12.000',
    description:
      'Líneas y figuras personalizadas con precisión milimétrica para un estilo único y llamativo.',
    includes: ['Diseño a medida', 'Perfilado y definición'],
    tag: 'Arte',
  },
  {
    name: 'Promoción Premium',
    price: '$16.000',
    description:
      'Promoción limitada que incluye corte, barba y limpieza facial express para una experiencia completa.',
    includes: ['Limpieza facial express', 'Corte + perfilado de barba', 'Peinado y styling'],
    tag: 'Promo',
  },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [serviceDetail, setServiceDetail] = useState<ServiceOption | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSelectedBarber(null);
        setSelectedDate(undefined);
        setSelectedSlot(null);
        setAvailableSlots([]);
        setSelectedService('');
        setServiceDetail(null);
        setFormData({ name: '', email: '', phone: '' });
        setSuccessMessage('');
        setErrorMessage('');
      }, 300);
    }
  }, [isOpen]);

  // Fetch available slots when date or barber changes
  useEffect(() => {
    if (selectedDate && selectedBarber) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedBarber]);

  const fetchAvailableSlots = async () => {
    if (!selectedDate || !selectedBarber) return;

    setLoadingSlots(true);
    try {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch(
        `/api/bookings?date=${dateString}&barberID=${selectedBarber.id}`
      );
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setErrorMessage('Error al cargar horarios disponibles');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBarber || !selectedDate || !selectedSlot || !selectedService) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barberID: selectedBarber.id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          timeSlot: selectedSlot.label,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          service: selectedService,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('¡Reserva confirmada! Te enviaremos un correo de confirmación.');
        setStep(5); // Success step
      } else {
        setErrorMessage(data.error || 'Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMessage('Error al procesar la reserva');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !selectedBarber) {
      setErrorMessage('Por favor selecciona un barbero');
      return;
    }
    if (step === 2 && !selectedDate) {
      setErrorMessage('Por favor selecciona una fecha');
      return;
    }
    if (step === 3 && !selectedSlot) {
      setErrorMessage('Por favor selecciona un horario');
      return;
    }
    setErrorMessage('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-surface border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Agenda tu Cita</h2>
                  {step < 5 && (
                    <p className="text-sm text-muted mt-1">
                      Paso {step} de 4
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2"
                  aria-label="Cerrar modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {errorMessage && (
                  <div className="mb-4 p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger">
                    {errorMessage}
                  </div>
                )}

                {/* Step 1: Select Barber */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Selecciona tu Barbero
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {barbersData.map((barber) => (
                        <button
                          key={barber.id}
                          onClick={() => setSelectedBarber(barber)}
                          className={`p-4 rounded-xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            selectedBarber?.id === barber.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={barber.imagen}
                              alt={barber.nombre}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-bold text-foreground">{barber.apodo}</h4>
                              <p className="text-sm text-muted">{barber.especialidad}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Select Date */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Selecciona la Fecha
                    </h3>
                    <div className="flex justify-center booking-calendar">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={es}
                        disabled={{ before: new Date() }}
                        fromDate={new Date()}
                        toDate={addDays(new Date(), 60)}
                        className="bg-background rounded-xl p-4"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Select Time Slot */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Selecciona el Horario
                    </h3>
                    {loadingSlots ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="text-muted mt-2">Cargando horarios...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.label}
                            onClick={() => setSelectedSlot(slot)}
                            disabled={!slot.available}
                            className={`py-3 px-4 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                              !slot.available
                                ? 'bg-surface text-muted cursor-not-allowed opacity-50'
                                : selectedSlot?.label === slot.label
                                ? 'bg-primary text-black'
                                : 'bg-surface border border-border hover:border-primary text-foreground'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Service & Contact Info */}
                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Detalles de la Reserva
                    </h3>

                    {/* Service Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <label className="block text-sm font-medium text-foreground">
                            Servicios y promociones
                          </label>
                          <p className="text-sm text-muted">
                            Toca un servicio para ver el detalle y confirmar tu elección.
                          </p>
                        </div>
                        {selectedService && (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30">
                            Seleccionado
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <button
                            key={service.name}
                            type="button"
                            onClick={() => setServiceDetail(service)}
                            className={`relative p-4 text-left rounded-xl border transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                              selectedService === service.name
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/60 bg-background'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-foreground">{service.name}</h4>
                                  {service.tag && (
                                    <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                                      {service.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted line-clamp-2">{service.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">{service.price}</p>
                                <p className="text-xs text-muted">Ver detalles</p>
                              </div>
                            </div>

                            {selectedService === service.name && (
                              <span className="absolute bottom-3 left-4 text-xs font-semibold text-primary">
                                Confirmado
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="+56 9 1234 5678"
                      />
                    </div>

                    {/* Summary */}
                    <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Resumen</h4>
                      <div className="space-y-1 text-sm text-muted">
                        <p><span className="text-foreground">Barbero:</span> {selectedBarber?.apodo}</p>
                        <p><span className="text-foreground">Fecha:</span> {selectedDate && format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
                        <p><span className="text-foreground">Hora:</span> {selectedSlot?.label}</p>
                      </div>
                    </div>
                  </form>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                        <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        ¡Reserva Confirmada!
                      </h3>
                      <p className="text-muted">{successMessage}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border text-left">
                      <h4 className="font-semibold text-foreground mb-2">Detalles de tu reserva:</h4>
                      <div className="space-y-1 text-sm text-muted">
                        <p><span className="text-foreground">Barbero:</span> {selectedBarber?.apodo}</p>
                        <p><span className="text-foreground">Servicio:</span> {selectedService}</p>
                        <p><span className="text-foreground">Fecha:</span> {selectedDate && format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
                        <p><span className="text-foreground">Hora:</span> {selectedSlot?.label}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {step < 5 && (
                <div className="sticky bottom-0 bg-surface border-t border-border px-6 py-4 flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-6 py-2 text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                    >
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="px-6 py-2 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Procesando...' : 'Confirmar Reserva'}
                    </button>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="sticky bottom-0 bg-surface border-t border-border px-6 py-4 flex justify-center">
                  <button
                    onClick={onClose}
                    className="px-8 py-2 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {serviceDetail && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-[60]"
                    onClick={() => setServiceDetail(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    className="fixed inset-0 z-[65] flex items-center justify-center p-4"
                  >
                    <div className="bg-surface border border-border rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-muted mb-1">Detalles del servicio</p>
                          <h4 className="text-2xl font-bold text-foreground leading-tight">{serviceDetail.name}</h4>
                          {serviceDetail.tag && (
                            <span className="inline-block mt-2 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                              {serviceDetail.tag}
                            </span>
                          )}
                        </div>
                        <button
                          aria-label="Cerrar detalles"
                          onClick={() => setServiceDetail(null)}
                          className="text-muted hover:text-foreground transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-3xl font-extrabold text-primary">{serviceDetail.price}</div>
                      <p className="text-muted leading-relaxed">{serviceDetail.description}</p>

                      {serviceDetail.includes && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-foreground">Incluye:</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {serviceDetail.includes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted bg-background border border-border rounded-lg px-3 py-2"
                              >
                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap justify-end gap-3 pt-2">
                        <button
                          onClick={() => setServiceDetail(null)}
                          className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Seguir mirando
                        </button>
                        <button
                          onClick={() => {
                            setSelectedService(serviceDetail.name);
                            setServiceDetail(null);
                          }}
                          className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-black font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Elegir este servicio
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
