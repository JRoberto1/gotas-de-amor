// Configuração de categorias — arquivo neutro (sem "use client")
// Importável tanto em server components quanto em client components
import {
  Sun,
  Moon,
  Heart,
  Star,
  Home,
  Zap,
  Users,
  Gift,
  Calendar,
  Ribbon,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CategoriaConfig {
  valor: string;
  nome: string;
  Icon: LucideIcon;
  cor: string;
  corFundo: string;
  corBorda: string;
}

export const CATEGORIAS: CategoriaConfig[] = [
  {
    valor: "bom-dia",
    nome: "Bom Dia",
    Icon: Sun,
    cor: "#92400e",
    corFundo: "#FFF7ED",
    corBorda: "#FFB347",
  },
  {
    valor: "boa-noite",
    nome: "Boa Noite",
    Icon: Moon,
    cor: "#fff",
    corFundo: "#4A4E8C",
    corBorda: "#4A4E8C",
  },
  {
    valor: "amor",
    nome: "Amor",
    Icon: Heart,
    cor: "#fff",
    corFundo: "#E8537A",
    corBorda: "#E8537A",
  },
  {
    valor: "fe-espiritualidade",
    nome: "Fé e Espiritualidade",
    Icon: Star,
    cor: "#fff",
    corFundo: "#9B72CF",
    corBorda: "#9B72CF",
  },
  {
    valor: "familia",
    nome: "Família",
    Icon: Home,
    cor: "#fff",
    corFundo: "#52B788",
    corBorda: "#52B788",
  },
  {
    valor: "motivacao",
    nome: "Motivação",
    Icon: Zap,
    cor: "#fff",
    corFundo: "#F4845F",
    corBorda: "#F4845F",
  },
  {
    valor: "amizade",
    nome: "Amizade",
    Icon: Users,
    cor: "#fff",
    corFundo: "#4ECDC4",
    corBorda: "#4ECDC4",
  },
  {
    valor: "aniversario",
    nome: "Aniversário",
    Icon: Gift,
    cor: "#78350f",
    corFundo: "#FFFBEB",
    corBorda: "#FFD166",
  },
  {
    valor: "datas-comemorativas",
    nome: "Datas Comemorativas",
    Icon: Calendar,
    cor: "#fff",
    corFundo: "#06D6A0",
    corBorda: "#06D6A0",
  },
  {
    valor: "meses-tematicos",
    nome: "Meses Temáticos",
    Icon: Ribbon,
    cor: "#fff",
    corFundo: "#118AB2",
    corBorda: "#118AB2",
  },
  {
    valor: "reflexao",
    nome: "Reflexão",
    Icon: Cloud,
    cor: "#fff",
    corFundo: "#8D99AE",
    corBorda: "#8D99AE",
  },
];
