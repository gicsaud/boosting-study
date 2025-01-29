import style from '../components/multilojas.module.scss';
import CardMultilojas from './CardMultilojas';

const RestaurantsList = ({ restaurantes, localizacaoSolicitada }) => {
  return (
    <div className={style.restaurantList}>
      {restaurantes.map((restaurante, index) => (
        <CardMultilojas
          key={index}
          nomeRestaurante={restaurante.NomeRestaurante}
          cidade={restaurante.Cidade}
          estado={restaurante.Estado}
          distancia={localizacaoSolicitada ? restaurante.distancia : undefined}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;