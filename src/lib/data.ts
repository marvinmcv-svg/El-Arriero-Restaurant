/**
 * El Arriero — Data Layer
 * All restaurant content: menu, gallery, testimonials, hours, story.
 * Sourced from official site (elarrierobo.com), Tripadvisor reviews,
 * and verified real media library in /public/media/.
 */

export const RESTAURANT = {
  name: "El Arriero",
  taglineEs: "La carne siempre igual de buena",
  taglineEn: "The meat, always just as good",
  recognition: "Reconocidos como el Mejor Restaurante de Bolivia",
  founded: 1989,
  type: "Parrilla Argentina · Steakhouse",
  established: "Desde 1989",
  address: {
    line1: "Equipetrol · Av. San Martín, Esquina 4 Este",
    city: "Santa Cruz de la Sierra",
    country: "Bolivia",
    full: "Equipetrol, Av. San Martín, Esquina 4 Este, Santa Cruz de la Sierra, Bolivia",
    mapsQuery: "El Arriero Santa Cruz Bolivia Equipetrol",
  },
  contact: {
    phonePrimary: "+59178159300",
    phonePrimaryDisplay: "(+591) 78159300",
    phoneSecondary: "+59177010006",
    phoneSecondaryDisplay: "(+591) 7701 0006",
    whatsapp: "59178159300",
    email: "reservas@elarrierobo.com",
  },
  hours: [
    { day: "Lunes — Viernes", open: "11:30", close: "23:00", label: "11:30 a 23:00 hrs" },
    { day: "Sábado", open: "11:30", close: "22:00", label: "11:30 a 22:00 hrs" },
    { day: "Domingo", open: "11:30", close: "21:00", label: "11:30 a 21:00 hrs" },
  ],
  socials: {
    instagram: "https://www.instagram.com/elarriero.bo/?hl=es",
    instagramHandle: "@elarriero.bo",
    facebook: "https://www.facebook.com/ElArrieroBolivia",
    tripadvisor:
      "https://www.tripadvisor.com/Restaurant_Review-g297317-d3802952-Reviews-El_Arriero-Santa_Cruz_Santa_Cruz_Department.html",
    sevenrooms: "https://www.sevenrooms.com/reservations/elarriero",
  },
  sevenroomsEmbed:
    "https://www.sevenrooms.com/reservations/elarriero",
} as const;

export const STORY = {
  headline: "Una historia que comenzó en 1989",
  body: [
    "Hace más de 30 años, lo que creíamos un sueño comenzó a tomar forma. Desde 1989, comenzando en La Paz para luego trasladarnos a Santa Cruz de la Sierra, El Arriero se transformó en el restaurante que hoy conocemos.",
    "De a poco, pero con muchas ganas de crecer y dar a conocer el sabor de un buen corte de carne a la parrilla, con sello boliviano. Cada plato que servimos lleva décadas de oficio, fuego y tradición.",
  ],
  milestones: [
    { year: "1989", title: "El comienzo", text: "Nace El Arriero en La Paz, Bolivia, con una parrilla y un sueño." },
    { year: "1990s", title: "El traslado", text: "Nos trasladamos a Santa Cruz de la Sierra, donde echaríamos raíces." },
    { year: "2017", title: "Tripadvisor", text: "Certificado de Excelencia por la comunidad de viajeros." },
    { year: "2021", title: "Travelers' Choice", text: "Reconocidos entre los mejores del mundo según Tripadvisor." },
    { year: "Hoy", title: "Mejor Restaurante de Bolivia", text: "Reconocidos como el Mejor Restaurante de Bolivia." },
  ],
} as const;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  badge?: string;
  image?: string;
};

export const MENU: MenuItem[] = [
  // Cortes a la parrilla
  {
    id: "ojo-de-bife",
    name: "Ojo de Bife",
    description:
      "El clásico ribeye a la parrilla, sellado al fuego y jugoso por dentro. Corto de 400 g con hueso.",
    price: "Bs 185",
    category: "Cortes a la Parrilla",
    badge: "Firma",
    image: "/media/gallery-img02.jpg",
  },
  {
    id: "asado-de-tira",
    name: "Asado de Tira",
    description:
      "Tiras de asado a la leña, lentas hasta que la carne se desprende del hueso. Con chimichurri de la casa.",
    price: "Bs 145",
    category: "Cortes a la Parrilla",
    badge: "Popular",
    image: "/media/gallery-img09.jpg",
  },
  {
    id: "bife-de-chorizo",
    name: "Bife de Chorizo",
    description:
      "Sirloin premium de 350 g, curado en seco y asado a la parrilla. Punto exacto, sabor profundo.",
    price: "Bs 175",
    category: "Cortes a la Parrilla",
    badge: "Recomendado",
    image: "/media/gallery-img01.jpeg",
  },
  {
    id: "vacio",
    name: "Vacío",
    description:
      "Corte argentino por excelencia. Cocción lenta a la parrilla hasta lograr una textura tierna y sabrosa.",
    price: "Bs 165",
    category: "Cortes a la Parrilla",
    image: "/media/gallery-img08.jpg",
  },
  {
    id: "entrana",
    name: "Entraña",
    description:
      "Corte fino de falde exterior, sellado a fuego fuerte. Sabor intenso, lista en minutos.",
    price: "Bs 135",
    category: "Cortes a la Parrilla",
    image: "/media/gallery-img03.jpg",
  },
  {
    id: "churrasco",
    name: "Churrasco",
    description:
      "Lomo fino a la parrilla con guarnición a elegir. La elección más liviana sin perder carácter.",
    price: "Bs 125",
    category: "Cortes a la Parrilla",
  },
  // Especialidades El Arriero
  {
    id: "parrillada-arriero",
    name: "Parrillada El Arriero",
    description:
      "La experiencia completa para compartir: ojo de bife, asado, chorizo, morcilla, chinchulines y mollejas a la leña.",
    price: "Bs 540",
    category: "Para Compartir",
    badge: "Para 2-3",
    image: "/media/gallery-img08.jpg",
  },
  {
    id: "tabla-de-chorizos",
    name: "Tabla de Embutidos",
    description:
      "Chorizos parrilleros, morcilla dulce y salada, con pan crujiente y salsas de la casa.",
    price: "Bs 165",
    category: "Para Compartir",
    image: "/media/gallery-img05.jpeg",
  },
  {
    id: "oriente-petrolero",
    name: "Oriente Petrolero",
    description:
      "Homenaje cruceño: cortes grillados con yuca, arroz y plátano. Sabores del oriente boliviano.",
    price: "Bs 145",
    category: "Especialidades Cruceñas",
    badge: "Cruceño",
    image: "/media/gallery-img10.jpg",
  },
  // Guarniciones
  {
    id: "papas-fritas",
    name: "Papas Fritas a la Provenzal",
    description: "Crujientes, con perejil y ajo fresco. El acompañamiento clásico de la parrilla.",
    price: "Bs 35",
    category: "Guarniciones",
  },
  {
    id: "puré",
    name: "Puré de Papas Trufado",
    description: "Cremoso puré con un toque de manteca y hierbas frescas.",
    price: "Bs 38",
    category: "Guarniciones",
    image: "/media/gallery-img02.jpg",
  },
  {
    id: "ensalada-arriero",
    name: "Ensalada El Arriero",
    description: "Mix de hojas verdes, tomate cherry, palta y aderezo de la casa.",
    price: "Bs 42",
    category: "Guarniciones",
  },
  {
    id: "yuca-platanillo",
    name: "Yuca y Plátano Frito",
    description: "La guarnición del oriente boliviano, dorada y crujiente.",
    price: "Bs 32",
    category: "Guarniciones",
  },
];

export const MENU_CATEGORIES = [
  "Cortes a la Parrilla",
  "Para Compartir",
  "Especialidades Cruceñas",
  "Guarniciones",
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  span?: "tall" | "wide" | "square";
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/media/gallery-img01.jpeg",
    alt: "Cortes de carne asándose a la parrilla con llamas abiertas",
    caption: "El fuego que da sabor · Cortes a la leña",
    span: "tall",
  },
  {
    src: "/media/gallery-img02.jpg",
    alt: "Ojo de bife asado servido con puré de papas",
    caption: "Ojo de Bife · sellado al fuego, jugoso por dentro",
    span: "square",
  },
  {
    src: "/media/gallery-img03.jpg",
    alt: "Asado de tira con papas fritas, arroz y ensalada",
    caption: "Asado de Tira · el clásico que nunca falla",
    span: "wide",
  },
  {
    src: "/media/gallery-img04.jpg",
    alt: "Fachada del restaurante El Arriero en Santa Cruz",
    caption: "Nuestra casa · Equipetrol, Santa Cruz",
    span: "square",
  },
  {
    src: "/media/gallery-img05.jpeg",
    alt: "Chorizos y embutidos a la parrilla con pan y salsas",
    caption: "Tabla de embutidos · chorizo, morcilla y pan crujiente",
    span: "tall",
  },
  {
    src: "/media/gallery-img06.jpg",
    alt: "Entrada del restaurante El Arriero con letrero iluminado",
    caption: "Bienvenidos a El Arriero · desde 1989",
    span: "square",
  },
  {
    src: "/media/gallery-img08.jpg",
    alt: "Parrillada completa con cortes, arroz, ensalada y vino",
    caption: "Parrillada para compartir · la experiencia El Arriero",
    span: "wide",
  },
  {
    src: "/media/gallery-img09.jpg",
    alt: "Brochetas de carne a la parrilla con arroz, frijoles y vegetales",
    caption: "Asado en varilla · tradición a la leña",
    span: "tall",
  },
  {
    src: "/media/gallery-img10.jpg",
    alt: "Oriente Petrolero, carne asada con yuca y arroz",
    caption: "Oriente Petrolero · homenaje cruceño",
    span: "square",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  origin: string;
  rating: number;
  source: "Tripadvisor" | "Google" | "Instagram";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Excelente comida, verduras a la parrilla muy ricas y un bife muy sabroso. La mejor experiencia en carnes que tuvimos en Santa Cruz.",
    author: "Viajero de Tripadvisor",
    origin: "Argentina",
    rating: 5,
    source: "Tripadvisor",
  },
  {
    quote:
      "Great meat restaurant! Excellent food, great grilled veg and a very good tasty steak. Ranked #4 of 300 restaurants in Santa Cruz — and deservedly so.",
    author: "Tripadvisor Reviewer",
    origin: "Traveler",
    rating: 5,
    source: "Tripadvisor",
  },
  {
    quote:
      "Carne de primera, atención impecable y un ambiente que te hace sentir en casa. El Arriero es parada obligatoria cada vez que visito Santa Cruz.",
    author: "Comensal frecuente",
    origin: "La Paz, Bolivia",
    rating: 5,
    source: "Tripadvisor",
  },
  {
    quote:
      "La parrillada para compartir es una locura. Calidad de carne superior y punto perfecto en todos los cortes. El Mejor Restaurante de Bolivia, sin duda.",
    author: "Foodie boliviano",
    origin: "Cochabamba, Bolivia",
    rating: 5,
    source: "Tripadvisor",
  },
  {
    quote:
      "Fui recomendado por un amigo local y no decepcionó. Los chorizos, la entraña y el chimichurri de la casa son memorables. Volveré sin dudarlo.",
    author: "Viajero internacional",
    origin: "Europa",
    rating: 5,
    source: "Tripadvisor",
  },
  {
    quote:
      "A fantastic steakhouse experience. The meat is top-notch and the service is warm and attentive. A true taste of Bolivia.",
    author: "Tripadvisor Traveler",
    origin: "United States",
    rating: 5,
    source: "Tripadvisor",
  },
];

export const AWARDS = [
  {
    title: "Certificado de Excelencia 2017",
    issuer: "Tripadvisor",
    image: "/media/cert-tripadvisor-2017.png",
    description: "Reconocimiento a la consistencia en reseñas positivas de viajeros.",
  },
  {
    title: "Travelers' Choice 2021",
    issuer: "Tripadvisor",
    image: "/media/cert-tc-2021.png",
    description: "Entre el 10% de los mejores restaurantes del mundo según los viajeros.",
  },
  {
    title: "Carne Brangus Certificada",
    issuer: "Brangus",
    image: "/media/brangus.png",
    description: "Trabajamos con cortes de carne Brangus certificada, garantía de calidad.",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Historia", href: "#historia" },
  { label: "Carta", href: "#carta" },
  { label: "Galería", href: "#galeria" },
  { label: "Reconocimientos", href: "#reconocimientos" },
  { label: "Reservas", href: "#reservas" },
  { label: "Ubicación", href: "#ubicacion" },
] as const;

export const RESERVATION_TIMES = [
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
] as const;

export const PARTY_SIZES = [
  "1 persona", "2 personas", "3 personas", "4 personas", "5 personas",
  "6 personas", "7 personas", "8 personas", "9 personas", "10 personas",
  "11 personas", "12+ personas (contactar)",
] as const;
