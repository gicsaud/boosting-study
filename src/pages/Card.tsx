import Image from "next/image";
import RestaurantsList from "../components/RestaurantList";
import style from "../components/multilojas.module.scss";
import { useState } from "react";

export default function CardPage() {
  const restaurantes = [
    {
      NomeRestaurante: "Tia Sônia A",
      Cidade: "São Paulo",
      Estado: "SP",
      latitude: -20.8451,
      longitude: -49.3687,
    },
    {
      NomeRestaurante: "Tia Sônia B",
      Cidade: "São Paulo",
      Estado: "SP",
      latitude: -20.8202,
      longitude: -49.3922,
    },
    {
      NomeRestaurante: "Tia Sônia C",
      Cidade: "São José do Rio Preto",
      Estado: "SP",
      latitude: -20.8170,
      longitude: -49.3726,
    },
    {
      NomeRestaurante: "Tia Sônia D",
      Cidade: "São José do Rio Preto",
      Estado: "SP",
      latitude: -20.7902,
      longitude: -49.3599,
    },
  ];

  const [cidadeSelecionada, setCidadeSelecionada] = useState<string | null>(null);
  const [restaurantesOrdenados, setRestaurantesOrdenados] = useState(restaurantes);
  const [erroLocalizacao, setErroLocalizacao] = useState<string | null>(null);
  const [localizacaoSolicitada, setLocalizacaoSolicitada] = useState(false);

  const cidadesUnicas = [...new Set(restaurantes.map((restaurante) => restaurante.Cidade))];

  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  };

  const ordenarPorDistancia = (coordsUsuario: any) => {
    const lojasComDistancia = restaurantes.map((restaurante) => {
        const distancia = calcularDistancia(
            coordsUsuario.latitude,
            coordsUsuario.longitude,
            restaurante.latitude,
            restaurante.longitude
        );
        return { ...restaurante, distancia }; // Adiciona a propriedade `distancia`
    });
    lojasComDistancia.sort((a, b) => a.distancia - b.distancia);
    setRestaurantesOrdenados(lojasComDistancia); // Atualiza o estado
};

  const solicitarLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordsUsuario = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocalizacaoSolicitada(true);
          setCidadeSelecionada(null); // Resetar a cidade selecionada
          ordenarPorDistancia(coordsUsuario);
        },
        (error) => {
          setErroLocalizacao('Erro ao obter localização. Verifique as permissões.');
          console.error(error);
        }
      );
    } else {
      setErroLocalizacao('Geolocalização não suportada pelo navegador.');
    }
  };

  const handleCidadeSelecionada = (cidade: string) => {
    setCidadeSelecionada(cidade);
    setLocalizacaoSolicitada(false); // Resetar a localização solicitada
    const restaurantesFiltrados = restaurantes.filter((restaurante) => restaurante.Cidade === cidade);
    setRestaurantesOrdenados(restaurantesFiltrados);
  };

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Image src="/logo.jpg" alt="Logo da Loja" width={80} height={80} />
      </div>
      <div className={style.nomeLoja}>
        <h1>TIA SÔNIA - MULTILOJAS</h1>
      </div>
      <div className={style.descricaoLoja}>
        <h4>Venha conhecer os nossos produtos!!!</h4>
      </div>
      <div className={style.botoesContainer}>
        <button
          className={style.botao}
          onClick={() => {
            setCidadeSelecionada(null);
            setLocalizacaoSolicitada(false);
            setRestaurantesOrdenados(restaurantes);
          }}
        >
          Tudo
        </button>
        <button className={style.botao} onClick={solicitarLocalizacao}>
          Mais Próximas
        </button>

        {cidadesUnicas.map((cidade, index) => (
          <button
            key={index}
            className={style.botao}
            onClick={() => handleCidadeSelecionada(cidade)}
          >
            {cidade}
          </button>
        ))}
      </div>
      {erroLocalizacao && <p className={style.erro}>{erroLocalizacao}</p>}
      <div>
        <RestaurantsList restaurantes={restaurantesOrdenados} localizacaoSolicitada={localizacaoSolicitada} />
      </div>
    </div>
  );
}