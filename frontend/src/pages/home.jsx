import React from 'react';
import Navbar from '../components/navbar';
import { Container } from 'semantic-ui-react';
import TemplatesTable from '../components/templates-table';
import MyPlansTable from '../components/my-plans-table';
import '../css/browse-view.css';

const Home = () =>
  <div style={{ overflowY: 'auto', paddingBottom: '50px' }}>
    <Navbar />
    <Container text className="browse-view">
      <MyPlansTable />
      <TemplatesTable />
    </Container>
  </div>
;

export default Home;
