/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItemVariation {
  label: string;
  price: string;
  priceNumber?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'folhados' | 'paes' | 'geleia-bebidas' | 'salgados' | 'tortas' | 'patisserie';
  categoryLabel: string;
  price: string;
  priceNumber?: number;
  description?: string;
  variations?: MenuItemVariation[];
  options?: string[];
  isSeasonal?: boolean;
  isOrderOnly?: boolean;
  featured?: boolean;
  image?: string;
}

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Todos os Produtos' },
  { id: 'folhados', label: 'Folhados / Viennoiserie' },
  { id: 'paes', label: 'Pães' },
  { id: 'geleia-bebidas', label: 'Geléia & Bebidas' },
  { id: 'salgados', label: 'Salgados & Quiches' },
  { id: 'tortas', label: 'Tortas Salgadas' },
  { id: 'patisserie', label: 'Pâtisserie - Doces' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // 1. FOLHADOS / VIENNOISERIE
  {
    id: 'croissant-au-beurre',
    name: 'Croissant au Beurre',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 10',
    priceNumber: 10,
    description: 'Tradicional massa folhada amanteigada francesa com textura alveolada e crocante.',
  },
  {
    id: 'croissant-recheado',
    name: 'Croissant Recheado',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 18',
    priceNumber: 18,
    options: ['Queijo', 'Presunto e Queijo', 'Frango com Catupiry', 'Romeu e Julieta'],
    description: 'Disponível nos recheios: Queijo, Presunto e Queijo, Frango com Catupiry ou Romeu e Julieta.',
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 18',
    priceNumber: 18,
    featured: true,
    image: '/images/featured_pain_au_chocolat.jpg',
    description: 'Massa folhada francesa artesanal recheada com barras de chocolate meio amargo nobre.',
  },
  {
    id: 'croissant-amendoas',
    name: 'Croissant Amêndoas',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 20',
    priceNumber: 20,
    featured: true,
    image: '/images/featured_croissant_amendoas.jpg',
    description: 'Creme frangipane de amêndoas com cobertura farta de lâminas tostadas e açúcar de confeiteiro.',
  },
  {
    id: 'croissant-pera-gorgonzola',
    name: 'Croissant Pêra com Gorgonzola',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 20',
    priceNumber: 20,
    description: 'Harmonização de pêras selecionadas e queijo gorgonzola envoltos em folhado dourado.',
  },
  {
    id: 'mini-croissant',
    name: 'Mini Croissant',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 6',
    priceNumber: 6,
    isSeasonal: true,
    description: 'Versão mini tradicional preparada sazonalmente.',
  },
  {
    id: 'mini-croissants-recheado',
    name: 'Mini Croissants recheado',
    category: 'folhados',
    categoryLabel: 'Folhados / Viennoiserie',
    price: 'R$ 9',
    priceNumber: 9,
    isSeasonal: true,
    description: 'Versão mini com recheio especial preparada sazonalmente.',
  },

  // 2. PÃES
  {
    id: 'brioche-nanterre',
    name: 'Brioche Nanterre (20cm)',
    category: 'paes',
    categoryLabel: 'Pães',
    price: 'R$ 30',
    priceNumber: 30,
    description: 'Brioche francês com miolo macio e dourado, amanteigado e aromático em formato tradicional.',
  },
  {
    id: 'pao-de-forma-brioche',
    name: 'Pão de Forma de Brioche',
    category: 'paes',
    categoryLabel: 'Pães',
    price: 'R$ 48',
    priceNumber: 48,
    description: 'Pão de forma artesanal de pura massa de brioche com textura aveludada.',
  },

  // 3. GELÉIA & BEBIDAS
  {
    id: 'geleia-frutas-vermelhas',
    name: 'Geléia de Frutas Vermelhas',
    category: 'geleia-bebidas',
    categoryLabel: 'Geléia',
    price: 'R$ 168/kg',
    description: 'Geléia artesanal de frutas vermelhas frescas preparadas na boulangerie.',
  },
  {
    id: 'cafe-coado',
    name: 'Café coado 150ml',
    category: 'geleia-bebidas',
    categoryLabel: 'Bebidas',
    price: 'R$ 7',
    priceNumber: 7,
    description: 'Café coado na hora.',
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com leite 150ml',
    category: 'geleia-bebidas',
    categoryLabel: 'Bebidas',
    price: 'R$ 9',
    priceNumber: 9,
    description: 'Café com leite vaporizado.',
  },
  {
    id: 'suco-laranja-300ml',
    name: 'Suco de laranja 300ml',
    category: 'geleia-bebidas',
    categoryLabel: 'Bebidas',
    price: 'R$ 20',
    priceNumber: 20,
    description: 'Suco 100% natural espremido fresco.',
  },
  {
    id: 'suco-laranja-500ml',
    name: 'Suco de laranja 500ml',
    category: 'geleia-bebidas',
    categoryLabel: 'Bebidas',
    price: 'R$ 35',
    priceNumber: 35,
    description: 'Suco 100% natural espremido fresco na garrafa de 500ml.',
  },
  {
    id: 'refrigerantes',
    name: 'Refrigerantes 220ml',
    category: 'geleia-bebidas',
    categoryLabel: 'Bebidas',
    price: 'R$ 5',
    priceNumber: 5,
    description: 'Lata de 220ml.',
  },

  // 4. SALGADOS
  {
    id: 'croque-monsieur',
    name: 'Croque-monsieur',
    category: 'salgados',
    categoryLabel: 'Salgados',
    price: 'A partir de R$ 33',
    priceNumber: 33,
    description: 'Clássico sanduíche quente francês gratinado ao forno.',
    variations: [
      { label: 'Tradicional (presunto e queijo)', price: 'R$ 33', priceNumber: 33 },
      { label: 'Sem presunto (e com queijo branco de Minas)', price: 'R$ 35', priceNumber: 35 },
      { label: 'Peito de peru com queijo branco de Minas', price: 'R$ 35', priceNumber: 35 },
    ],
  },
  {
    id: 'quiches-basicas',
    name: 'Quiches Básicas',
    category: 'salgados',
    categoryLabel: 'Quiches',
    price: 'R$ 28 (Individual)',
    priceNumber: 28,
    description: 'Sabores: Alho Poró, Lorraine (bacon), Abobrinha, Queijo Suave.',
    options: ['Alho Poró', 'Lorraine (bacon)', 'Abobrinha', 'Queijo Suave'],
    variations: [
      { label: 'Individual', price: 'R$ 28', priceNumber: 28 },
      { label: '1kg a 2,5kg', price: 'R$ 188/kg' },
    ],
  },
  {
    id: 'quiche-ricota-espinafre',
    name: 'Quiche Ricota defumada com espinafre',
    category: 'salgados',
    categoryLabel: 'Quiches Especiais',
    price: 'R$ 35 (Individual)',
    priceNumber: 35,
    description: 'Recheio suave de ricota defumada e espinafre fresco selecionado.',
    variations: [
      { label: 'Individual', price: 'R$ 35', priceNumber: 35 },
      { label: '1kg a 2,5kg', price: 'R$ 228/kg' },
    ],
  },
  {
    id: 'quiche-brie-tomate-rucula',
    name: 'Quiche Queijo Brie com tomate seco e rúcula',
    category: 'salgados',
    categoryLabel: 'Quiches Especiais',
    price: 'R$ 35 (Individual)',
    priceNumber: 35,
    description: 'Queijo Brie cremoso, tomates secos artesanais e folhas frescas de rúcula.',
    variations: [
      { label: 'Individual', price: 'R$ 35', priceNumber: 35 },
      { label: '1kg a 2,5kg', price: 'R$ 228/kg' },
    ],
  },
  {
    id: 'talmousse-esfiha-marroquina',
    name: 'Talmousse - Esfiha Marroquina',
    category: 'salgados',
    categoryLabel: 'Salgados Especiais',
    price: 'R$ 38',
    priceNumber: 38,
    isSeasonal: true,
    description: 'Fazemos apenas sazonalmente: Niçoise (atum, aliche, batata, pimentões sem pele, tomate, ervilha, cenoura).',
  },
  {
    id: 'saladinha',
    name: 'Saladinha',
    category: 'salgados',
    categoryLabel: 'Salgados',
    price: 'R$ 12',
    priceNumber: 12,
    description: 'Saladinha fresca da casa para acompanhar quiches e tortas.',
  },

  // 5. TORTAS SALGADAS
  {
    id: 'torta-frango',
    name: 'Torta de Frango',
    category: 'tortas',
    categoryLabel: 'Tortas',
    price: 'A partir de R$ 28',
    priceNumber: 28,
    description: 'Massa crocante e recheio farto de frango temperado.',
    variations: [
      { label: 'Individual', price: 'R$ 28', priceNumber: 28 },
      { label: 'Média', price: 'R$ 56', priceNumber: 56 },
      { label: 'Grande', price: 'R$ 108', priceNumber: 108 },
    ],
  },

  // 6. PÂTISSERIE - DOCES
  {
    id: 'tarte-tatin',
    name: 'Tarte Tatin (Maçã caramelizada)',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 22 (Individual)',
    priceNumber: 22,
    featured: true,
    image: '/images/featured_tarte_tatin.jpg',
    description: 'Clássica torta francesa invertida com maçãs caramelizadas em ponto perfeito e massa crocante.',
    variations: [
      { label: 'Individual', price: 'R$ 22', priceNumber: 22 },
      { label: '1kg a 2,5kg', price: 'R$ 178/kg' },
    ],
  },
  {
    id: 'torta-maca-verde-francesa',
    name: 'Torta de maçã verde francesa',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 22 (Individual)',
    priceNumber: 22,
    description: 'Fatias finas de maçã verde francesa delicadamente dispostas sobre base amanteigada.',
    variations: [
      { label: 'Individual', price: 'R$ 22', priceNumber: 22 },
      { label: '1kg a 2,5kg', price: 'R$ 178/kg' },
    ],
  },
  {
    id: 'torta-americana-maca',
    name: 'Torta Americana de Maçã',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 26 (Individual)',
    priceNumber: 26,
    description: 'Torta coberta com recheio de maçãs aromáticas e especiarias suaves.',
    variations: [
      { label: 'Individual', price: 'R$ 26', priceNumber: 26 },
      { label: '1kg a 2,5kg', price: 'R$ 188/kg' },
    ],
  },
  {
    id: 'torta-bourdalou',
    name: 'Torta Bourdalou',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 22 (Individual)',
    priceNumber: 22,
    description: 'Pêra com amêndoas tradicional ou ao vinho.',
    variations: [
      { label: 'Individual', price: 'R$ 22', priceNumber: 22 },
      { label: 'Oval', price: 'R$ 38', priceNumber: 38 },
      { label: '1kg a 2,5kg', price: 'R$ 178/kg' },
    ],
  },
  {
    id: 'torta-limao-merengue',
    name: 'Torta de Limão com Merengue Italiano',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 22 (Individual)',
    priceNumber: 22,
    description: 'Creme aveludado de limão coroado com merengue italiano tostado na hora.',
    variations: [
      { label: 'Individual', price: 'R$ 22', priceNumber: 22 },
      { label: 'Oval', price: 'R$ 38', priceNumber: 38 },
      { label: '1kg a 2,5kg', price: 'R$ 178/kg' },
    ],
  },
  {
    id: 'brownie',
    name: 'Brownie com ou sem nozes',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 26 (Individual)',
    priceNumber: 26,
    description: 'Brownie artesanal denso de chocolate nobre, disponível com ou sem nozes.',
    variations: [
      { label: 'Individual', price: 'R$ 26', priceNumber: 26 },
      { label: '1kg a 2,5kg', price: 'R$ 208/kg' },
    ],
  },
  {
    id: 'tartelette-chocolate',
    name: 'Tartelette Chocolate',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 26 (Individual)',
    priceNumber: 26,
    description: 'Ganache de chocolate meio amargo.',
    variations: [
      { label: 'Individual', price: 'R$ 26', priceNumber: 26 },
      { label: 'Oval', price: 'R$ 42', priceNumber: 42 },
      { label: '1kg a 2,5kg', price: 'R$ 218/kg' },
    ],
  },
  {
    id: 'torta-frutas-vermelhas',
    name: 'Torta de frutas vermelhas',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 268/kg',
    isOrderOnly: true,
    description: 'Somente encomenda. Feita com frutas vermelhas selecionadas em base pâtissière.',
    variations: [
      { label: '1kg a 2,5kg', price: 'R$ 268/kg' },
    ],
  },
  {
    id: 'opera-frances',
    name: 'Ópera Francês',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 35 (Individual)',
    priceNumber: 35,
    description: 'Bolo feito com camadas de biscuit Gioconde - farinha de amêndoas, creme de café e chocolate, unidas com um pouco de rum.',
    variations: [
      { label: 'Individual', price: 'R$ 35', priceNumber: 35 },
      { label: '1kg a 2,5kg', price: 'R$ 328/kg' },
    ],
  },
  {
    id: 'opera-brasileiro',
    name: 'Ópera Brasileiro',
    category: 'patisserie',
    categoryLabel: 'Pâtisserie',
    price: 'R$ 35 (Individual)',
    priceNumber: 35,
    description: 'Bolo feito com camadas de biscuit Gioconde - farinha de amêndoas, creme de cupuaçu e chocolate, unidas com um pouco de cachaça.',
    variations: [
      { label: 'Individual', price: 'R$ 35', priceNumber: 35 },
      { label: '1kg a 2,5kg', price: 'R$ 328/kg' },
    ],
  },
];
