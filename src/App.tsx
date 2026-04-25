import { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Users, Briefcase, Image, HomeIcon, 
  Star, MessageCircle, Phone, ChevronRight, Calendar,
  DollarSign, Wrench, Heart, Shield, CheckCircle, MapPin,
  Mail, Clock, ArrowRight, XCircle, User, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

// Types
//interface Logement {
  //id: number;
  //type: string;
  //pieces: number;
  //superficie: string;
  //loyer: string;
  //disponible: string;
  //description: string;
  //image: string;
//}

interface Logement {
  id: number;
  type: string;
  pieces: number;
  superficie: string;
  loyer: string;
  disponible: string;
  description: string;
  image: string;

  annonce: {
    titre: string;
    description: string;
    profil: string[];
    competences: string[];
    responsabilites: string[];
    contact: string;
  };
}

interface Comite {
  id: string;
  nom: string;
  description: string;
  responsabilites: string[];
  icon: React.ReactNode;
}

interface Administrateur {
  id: number;
  nom: string;
  role: string;
  description: string;
}

interface Temoignage {
  id: number;
  nom: string;
  membreDepuis: string;
  texte: string;
  initiales: string;
}
/*
// Données
const logementsDisponibles: Logement[] = [
  {
    id: 1,
    type: "4½",
    pieces: 4,
    superficie: "85 m²",
    loyer: "information disponible ultérieurement",
    disponible: "1er Juillet 2026",
    description: "Bel appartement de 4 pièces avec balcon, cuisine rénovée, près des services et transports.",
    image: "/gallery-interior-1.jpg"
  }
]; */


const logementsDisponibles: Logement[] = [
  {
    id: 1,
    type: "4½",
    pieces: 4,
    superficie: "85 m²",
    loyer: "À confirmer",
    disponible: "À partir de juillet 2026",
    description:
      "Bel appartement de 4 pièces avec balcon, cuisine rénovée, près des services et transports.",
    image: "/gallery-interior-1.jpg",

    annonce: {
      titre: "Recherche locataire responsable – Disponible dès juillet",
      description:
        "La Coopérative Papineau offre un milieu de vie communautaire, sécuritaire et convivial, où les membres s’impliquent activement dans la vie collective et certaines tâches communes. Nous sommes à la recherche d’un·e locataire fiable et polyvalent·e pour un logement 4½.",

      profil: [
        "Personne responsable, respectueuse et engagée dans la vie coopérative",
        "Bon sens de l’organisation et esprit communautaire",
        "Capacité à effectuer des petites réparations et de l’entretien général (profil « à tout faire »)"
      ],

      competences: [
        "Plomberie",
        "Électricité",
        "Ventilation",
        "Chauffage"
      ],

      responsabilites: [
        "Assurer l’entretien courant du logement",
        "Effectuer des réparations de base",
        "Signaler rapidement tout problème majeur",
        "Respecter le voisinage ainsi que les espaces communs"
      ],

      contact: "coop9890admission@gmail.com"
    }
  }
];

const comites: Comite[] = [
  {
    id: "bon-voisinage",
    nom: "Comité de Bon Voisinage",
    description: "Favorise l'entraide et la solidarité entre les membres de la coopérative.",
    responsabilites: [
      "Organiser des activités sociales et communautaires",
      "Accueillir les nouveaux membres",
      "Médier en cas de conflits entre voisins",
      "Promouvoir la vie communautaire"
    ],
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: "selection",
    nom: "Comité de Sélection",
    description: "Évalue les candidatures pour l'attribution des logements disponibles.",
    responsabilites: [
      "Recevoir et analyser les demandes d'adhésion",
      "Rencontrer les candidats potentiels",
      "Vérifier les critères d'admissibilité",
      "Faire des recommandations au Conseil d'administration"
    ],
    icon: <Users className="w-6 h-6" />
  },
  {
    id: "finance",
    nom: "Comité des Finances",
    description: "Surveille la santé financière de la coopérative et prépare les budgets.",
    responsabilites: [
      "Préparer le budget annuel",
      "Surveiller les dépenses et les revenus",
      "Analyser les états financiers",
      "Proposer des ajustements de loyers"
    ],
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    id: "entretien",
    nom: "Comité d'Entretien et Réparations",
    description: "Planifie et supervise les travaux d'entretien et de rénovation.",
    responsabilites: [
      "Identifier les besoins en rénovation",
      "Planifier les travaux d'entretien",
      "Superviser les entrepreneurs",
      "Gérer les projets d'amélioration"
    ],
    icon: <Wrench className="w-6 h-6" />
  }
];

const administrateurs: Administrateur[] = [
  {
    id: 1,
    nom: "Ousmane",
    role: "Président",
    description: "Responsable de la direction stratégique et de la représentation de la coopérative."
  },
  {
    id: 2,
    nom: "Mourad",
    role: "Secrétaire",
    description: "Gère la documentation, les procès-verbaux et la communication officielle."
  },
  {
    id: 3,
    nom: "Ali",
    role: "Trésorier",
    description: "Supervise la gestion financière et les transactions de la coopérative."
  },
  {
    id: 4,
    nom: "Yazid",
    role: "Financier",
    description: "Analyse les budgets et assure le suivi des aspects financiers détaillés."
  },
  {
    id: 5,
    nom: "Mouloud",
    role: "Administrateur de Suivi",
    description: "Assure le suivi des projets et de la mise en œuvre des décisions."
  }
];

const temoignages: Temoignage[] = [
  {
    id: 1,
    nom: "Visiteur 1",
    membreDepuis: "2025",
    texte: "Vivre à la coopérative Papineau Ahuntsic a complètement transformé notre façon de voir le logement. Ici, on se sent vraiment chez soi et on fait partie d'une vraie communauté.",
    initiales: "MD"
  },
  {
    id: 2,
    nom: "Visiteur 2",
    membreDepuis: "2026",
    texte: "Ce qui m'a séduit, c'est la dimension démocratique de la coopérative. Pouvoir participer aux décisions qui concernent notre lieu de vie, c'est une expérience enrichissante.",
    initiales: "JL"
  },
  {
    id: 3,
    nom: "Visiteur 3",
    membreDepuis: "2026",
    texte: "En tant que mère célibataire, trouver un logement abordable et sécuritaire était crucial pour moi. La coopérative m'a offert exactement ce dont j'avais besoin.",
    initiales: "ST"
  },
  {
    id: 4,
    nom: "Visiteur 4",
    membreDepuis: "2018",
    texte: "Nous avons vu la coopérative évoluer au fil des années et nous sommes fiers d'avoir contribué à son développement. C'est un endroit où les liens se tissent naturellement.",
    initiales: "RG"
  }
];

const galleryImages = [
  { src: "/Plans-App.jpg", alt: "Entrée de l'immeublegit --version", category: "Extérieur" },
  { src: "/gallery-interior-2.jpg", alt: "Entrée de l'immeuble", category: "Extérieur" },
  { src: "/gallery-bedroom.jpg", alt: "Vue de côté du garage", category: "Extérieur" },
  { src: "/gallery-bathroom.jpg", alt: "Accès au garage", category: "Extérieur" },
  { src: "/gallery-garden.jpg", alt: "Entrée principale de l’immeuble", category: "Extérieur" },
  { src: "/gallery-salle.jpg", alt: "Vue de côté du garage", category: "Extérieur" },
  { src: "/gallery-exterior.jpg", alt: "Entrée de l'immeuble", category: "Interieur" },
  { src: "/hero-building.jpg", alt: "Vue de l'immeuble", category: "Extérieur" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogementDialog, setShowLogementDialog] = useState(false);
  const [selectedLogement, setSelectedLogement] = useState<Logement | null>(null);
  const [, setActiveSection] = useState('accueil');
  const [scrolled, setScrolled] = useState(false);

  
// Galerie Lightbox
const [isGalleryOpen, setIsGalleryOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleLogementClick = (logement: Logement) => {
    setSelectedLogement(logement);
    setShowLogementDialog(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous contacterons bientôt.");
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'a-propos', label: 'À propos', icon: Building },
    { id: 'comites', label: 'Comités', icon: Users },
    { id: 'galerie', label: 'Galerie', icon: Image },
    { id: 'logements', label: 'Logements', icon: HomeIcon },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'temoignages', label: 'Témoignages', icon: MessageCircle },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      
      {/* Bannière Logement Disponible */}
      {logementsDisponibles.length > 0 && (
        <div 
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 cursor-pointer hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
          onClick={() => handleLogementClick(logementsDisponibles[0])}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
              </span>
              <span className="font-semibold">LOGEMENT DISPONIBLE</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Un appartement {logementsDisponibles[0].type} est disponible - Cliquez pour voir les détails</span>
            <ArrowRight className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-${logementsDisponibles.length > 0 ? '12' : '0'} left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <Building className="w-6 h-6" />
              </div>
              <span className={`font-bold text-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Coopérative Papineau Ahuntsic
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/hero-building.jpg" 
            alt="Coopérative Papineau Ahuntsic" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-emerald-600 hover:bg-emerald-700 text-white">
              Coopérative d'habitation à Montréal
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Coopérative d'Habitation<br />
              <span className="text-emerald-400">Papineau Ahuntsic</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Un lieu de vie communautaire où le bien-être des membres est au cœur de nos priorités. 
              Découvrez une approche unique du logement basée sur la solidarité et la participation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => scrollToSection('contact')}
              >
                Nous contacter
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                //className="border-white text-white hover:bg-white hover:text-gray-900"
                className="border-white bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => scrollToSection('a-propos')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">23</div>
                <div className="text-white/80 text-sm mt-1">Logements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm mt-1">Membres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">30</div>
                <div className="text-white/80 text-sm mt-1">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">5</div>
                <div className="text-white/80 text-sm mt-1">Comités actifs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À Propos Section */}
      <section id="a-propos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">À propos de nous</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Une coopérative engagée depuis 1994
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La Coopérative d'Habitation Papineau Ahuntsic est née de la volonté de créer un lieu de vie 
              accessible, chaleureux et participatif dans le quartier Ahuntsic de Montréal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="/gallery-exterior.jpg" 
                alt="Notre coopérative" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Mission</h3>
                <p className="text-gray-600">
                  Offrir des logements abordables et de qualité dans un environnement respectueux de 
                  l'environnement, tout en favorisant la participation active des membres à la vie 
                  démocratique de la coopérative.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Vision</h3>
                <p className="text-gray-600">
                  Devenir un modèle de coopérative d'habitation au Québec, reconnu pour notre engagement 
                  envers l'accessibilité, la durabilité environnementale et le bien-être de nos membres.
                </p>
              </div>
            </div>
          </div>

          {/* Valeurs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Solidarité", desc: "Entraide et soutien mutuel entre tous les membres" },
              { icon: Shield, title: "Sécurité", desc: "Un environnement sûr et paisible pour tous" },
              { icon: Users, title: "Participation", desc: "Chaque membre contribue selon ses capacités" },
              { icon: CheckCircle, title: "Accessibilité", desc: "Des logements abordables pour tous" },
            ].map((valeur, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <valeur.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{valeur.title}</h4>
                  <p className="text-gray-600 text-sm">{valeur.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comités Section */}
      <section id="comites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Nos Comités</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              La vie démocratique de notre coopérative
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre coopérative fonctionne grâce à l'engagement de ses membres dans différents comités 
              et au Conseil d'administration.
            </p>
          </div>

          <Tabs defaultValue="comites" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="comites">Les Comités</TabsTrigger>
              <TabsTrigger value="ca">Conseil d'Administration</TabsTrigger>
            </TabsList>

            <TabsContent value="comites">
              <div className="grid md:grid-cols-2 gap-6">
                {comites.map((comite) => (
                  <Card key={comite.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          {comite.icon}
                        </div>
                        <CardTitle className="text-xl">{comite.nom}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{comite.description}</p>
                      <ul className="space-y-2">
                        {comite.responsabilites.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ca">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {administrateurs.map((admin) => (
                  <Card key={admin.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{admin.nom}</h4>
                      <Badge className="mb-3 bg-emerald-100 text-emerald-700">{admin.role}</Badge>
                      <p className="text-gray-600 text-sm">{admin.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Le Conseil d'administration est élu lors de l'assemblée générale annuelle 
                  et se réunit mensuellement pour prendre les décisions importantes de la coopérative.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="galerie" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Galerie Photos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Découvrez notre coopérative
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorez les espaces de vie, les aires communes et les installations de notre coopérative.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, idx) => (
              
<div
  key={idx}
  onClick={() => {
    setCurrentImageIndex(idx);
    setIsGalleryOpen(true);
  }}
  className={`group relative overflow-hidden rounded-xl cursor-pointer ${
    idx === 0 || idx === 7 ? 'sm:col-span-2 sm:row-span-2' : ''
  }`}
>

                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-600 text-white mb-2">{image.category}</Badge>
                    <p className="text-white font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logements Disponibles Section */}
      <section id="logements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Logements</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Logements disponibles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Consultez nos logements actuellement disponibles et rejoignez notre communauté.
            </p>
          </div>

          {logementsDisponibles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logementsDisponibles.map((logement) => (
                <Card key={logement.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={logement.image} 
                      alt={`Logement ${logement.type}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-600 text-white">Disponible</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{logement.type}</h3>
                      <span className="text-emerald-600 font-bold text-xl">{logement.loyer}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{logement.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <HomeIcon className="w-4 h-4 text-emerald-600" />
                        {logement.pieces} pièces
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4 text-emerald-600" />
                        {logement.superficie}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        {logement.disponible}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleLogementClick(logement)}
                    >
                      Voir les détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun logement disponible</h3>
                <p className="text-gray-600 mb-6">
                  Actuellement, nous n'avons pas de logement disponible. Vous pouvez toutefois 
                  nous contacter pour être ajouté sur notre liste d'attente.
                </p>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => scrollToSection('contact')}
                >
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          )}

{/* Lightbox Galerie */}
<Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
  <DialogContent className="max-w-6xl bg-black p-4">
    
    {/* Image */}
    <div className="relative flex items-center justify-center">
      <img
        src={galleryImages[currentImageIndex].src}
        alt={galleryImages[currentImageIndex].alt}
        className="max-h-[80vh] object-contain rounded"
      />

      {/* Bouton précédent */}
      <button
        onClick={() =>
          setCurrentImageIndex(
            (currentImageIndex - 1 + galleryImages.length) %
              galleryImages.length
          )
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        ‹
      </button>

      {/* Bouton suivant */}
      <button
        onClick={() =>
          setCurrentImageIndex(
            (currentImageIndex + 1) % galleryImages.length
          )
        }
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        ›
      </button>
    </div>

    {/* Légende */}
    <p className="text-center text-white mt-4">
      {galleryImages[currentImageIndex].alt}
    </p>
  </DialogContent>
</Dialog>


        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Nos Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Des services pour simplifier votre quotidien
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "Entretien et Réparations", items: ["Maintenance préventive", "Réparations rapides", "Service d'urgence"] },
              { icon: Heart, title: "Espaces Verts", items: ["Jardins partagés", "Aires de détente", "Activités de jardinage"] },
              { icon: Building, title: "Stationnement", items: ["Attribution par critères de mérite", "Processus transparent", "Stationnement visiteurs"] },
              { icon: Users, title: "Espace Communautaire (Garage)", items: ["Fêtes et célébrations", "Activités communautaires", "Espace polyvalent"] },
              { icon: CheckCircle, title: "Parties Communes", items: ["Nettoyage quotidien", "Désinfection régulière", "Gestion des déchets"] },
              { icon: Star, title: "Vie Communautaire", items: ["Événements saisonniers", "Ateliers divers", "Comités de vie"] },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-700 text-white hover:bg-emerald-700">Pourquoi nous choisir</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Les avantages de vivre en coopérative
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Loyers Abordables", desc: "Des loyers jusqu'à 20% moins chers que le marché locatif privé" },
              { title: "Démocratie Participative", desc: "Chaque membre a une voix égale dans les décisions importantes" },
              { title: "Sécurité d'Occupation", desc: "Un bail stable et sécurisé tant que vous respectez les règles" },
              { title: "Participation Financière", desc: "Acquérez des parts sociales remboursables en cas de départ" },
              { title: "Qualité de Vie", desc: "Des espaces communs bien entretenus et une communauté solidaire" },
              { title: "Accompagnement", desc: "Une équipe de gestion professionnelle à votre service" },
            ].map((avantage, idx) => (
              <div key={idx} className="bg-emerald-800/50 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{avantage.title}</h3>
                <p className="text-emerald-100">{avantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section id="temoignages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Témoignages</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos membres
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {temoignages.map((temoignage) => (
              <Card key={temoignage.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{temoignage.initiales}</span>
                    </div>
                    <div>
                      <p className="text-gray-600 italic mb-4">"{temoignage.texte}"</p>
                      <div>
                        <p className="font-bold text-gray-900">{temoignage.nom}</p>
                        <p className="text-sm text-gray-500">Membre depuis {temoignage.membreDepuis}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Contact</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vous avez des questions sur la coopérative, les logements disponibles ou les démarches d'adhésion ?
              N'hésitez pas à nous contacter.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600">25-9890 avenue Papineau, Montréal, QC H2B 1Z8</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <p className="text-gray-600">(514) 111-1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Courriel de conseil d’administration</p>
                    <p className="text-gray-600">papineau9890@yahoo.ca</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Courriel de comité de sélection</p>
                    <p className="text-gray-600">Coop9890admission@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Heures d'ouverture</p>
                    <p className="text-gray-600">Tous les jours de la semaine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Courriel *</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input 
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="(514) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                    <select 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="logement">Logement disponible</option>
                      <option value="adhesion">Demande d'adhésion</option>
                      <option value="information">Demande d'information</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Votre message..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 text-white p-2 rounded-lg">
                  <Building className="w-5 h-5" />
                </div>
                <span className="font-bold">Coopérative Papineau Ahuntsic</span>
              </div>
              <p className="text-gray-400 text-sm">
                Une coopérative d'habitation engagée depuis 1994, offrant des logements abordables 
                et une communauté solidaire à Montréal.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources membres</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Charte des membres</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Règlements</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Formulaires</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Assemblées générales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens externes</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">CQCH</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Coopératives d'habitation du Québec</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">SHQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Coopérative d'Habitation Papineau Ahuntsic. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Dialog Logement */}
      <Dialog open={showLogementDialog} onOpenChange={setShowLogementDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Détails du logement</DialogTitle>
            <DialogDescription>
              Informations complètes sur le logement disponible
            </DialogDescription>
          </DialogHeader>
          {selectedLogement && (
            <div className="space-y-6">
              <img 
                src={selectedLogement.image} 
                alt={`Logement ${selectedLogement.type}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-xl font-bold text-emerald-700">{selectedLogement.type}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Loyer mensuel</p>
                  <p className="text-xl font-bold text-emerald-700">{selectedLogement.loyer}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Superficie</p>
                  <p className="font-semibold">{selectedLogement.superficie}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Disponible le</p>
                  <p className="font-semibold">{selectedLogement.disponible}</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedLogement.description}</p>
              </div>


<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 space-y-4">
  <h3 className="text-xl font-bold text-emerald-800">
    {selectedLogement.annonce.titre}
  </h3>

  <p className="text-gray-700">
    {selectedLogement.annonce.description}
  </p>

  <div>
    <h4 className="font-semibold text-gray-900 mb-1">Profil recherché</h4>
    <ul className="list-disc pl-5 space-y-1 text-gray-700">
      {selectedLogement.annonce.profil.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>

  <div>
    <h4 className="font-semibold text-gray-900 mb-1">
      Compétences pratiques (atout important)
    </h4>
    <ul className="list-disc pl-5 space-y-1 text-gray-700">
      {selectedLogement.annonce.competences.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
  </div>

  <div>
    <h4 className="font-semibold text-gray-900 mb-1">Responsabilités</h4>
    <ul className="list-disc pl-5 space-y-1 text-gray-700">
      {selectedLogement.annonce.responsabilites.map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>
  </div>

  <p className="font-medium text-gray-800">
    Intéressé·e ? Envoyez votre candidature à{" "}
    <a
      href={`mailto:${selectedLogement.annonce.contact}`}
      className="text-emerald-700 underline"
    >
      {selectedLogement.annonce.contact}
    </a>
  </p>
</div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    setShowLogementDialog(false);
                    scrollToSection('contact');
                    toast.success("Vous pouvez maintenant nous contacter pour ce logement !");
                  }}
                >
                  Demander ce logement
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowLogementDialog(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
