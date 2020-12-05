import logo from './logo.svg';
import './App.css';
import {IntlProvider, useIntl, FormattedMessage} from 'react-intl';
import strings from './locale/strings';
import { Badge, Container, Table } from "react-bootstrap";
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import useWindowDimensions from './hooks/useWindowsdimensions';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function App() {
  const defaultLocale = "en";
  const intl = useIntl();
  const t = intl.formatMessage;
  let messages = strings[intl.locale];
  if (!messages) {
    messages = strings[defaultLocale];
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if(!navigator.onLine) {
        setData(JSON.parse(localStorage.getItem('pokimons') ?? '{}'));
      } else {
        try {
          let data = [];
          if(intl.locale === "es") {
            const response = await axios.get('https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json');
            data = response.data;
          } else {
            const response = await axios.get('https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json');
            data = response.data;
          }
          localStorage.setItem('pokimons', JSON.stringify(data));
          setData(data);
        }
        catch(error) {
          setData(JSON.parse(localStorage.getItem('pokimons') ?? '{}'));
        }
      }
    }
    fetchData();
  }, []);
  return (
      <Container id="contenedorOP">
        <Table striped bordered>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                {t({id: 'imageHeader'})}
              </th>
              <th>
                {t({id: 'nameHeader'})}
              </th>
              <th>
                {t({id: 'descriptionHeader'})}
              </th>
              <th>
                {t({id: 'heightHeader'})}
              </th>
              <th>
                {t({id: 'weightHeader'})}
              </th>
              <th>
                {t({id: 'typeHeader'})}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((pokimon, index) => 
              <tr key={index}>
                <td>
                  {pokimon.number}
                </td>
                <td>
                  <img src={pokimon.ThumbnailImage} alt={pokimon.name}></img>
                </td>
                <td>
                  {pokimon.name}
                </td>
                <td>
                  {pokimon.description}
                </td>
                <td>
                  {pokimon.height}
                </td>
                <td>
                  {pokimon.weight}
                </td>
                <td>
                  {pokimon.type.map(type => 
                    <Badge key={`${type}${index}`} variant="secondary">{type}</Badge>
                  )}
                </td>
              </tr>
            )
            }
          </tbody>
        </Table>
        {navigator.onLine && (
          <BarChartComponent pokimons={data} />
        )}
      </Container>
  );
}

const BarChartComponent = ({ pokimons }) => {
  const intl = useIntl();
  const t = intl.formatMessage;
  const { width } = useWindowDimensions();
  let chartWidth = 1140;
  /*if(width > 1200) {
    chartWidth = 1140;
  } else if(width > 992) {
    chartWidth = 920;
  } else if (width > 768) {
    chartWidth = 720;
  } else if (width > 576) {
    chartWidth = 540;
  } else {
    chartWidth = width;
  }*/
  return (
    <Container style={{height: '400px', width: "100%", padding: '0px', marginBottom: '24px'}}>
      <h5>{t({id: 'heightTitle'})}</h5>
      <BarChart
        width={chartWidth}
        height={300}
        data={pokimons.map(pokimon => ({name: pokimon.name, height: pokimon.height}))}
        margin={{
          top: 5, right: 30, left: 20, bottom: 35,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="height" fill="#8884d8" />
      </BarChart>
    </Container>
  );
}

export default App;
