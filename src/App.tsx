import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Accessibility from './pages/Accessibility';
import Sitemap from './pages/Sitemap';
import WeightLoss from './pages/categories/WeightLoss';
import HormoneTherapy from './pages/categories/HormoneTherapy';
import AntiAging from './pages/categories/AntiAging';
import SexualWellness from './pages/categories/SexualWellness';
import CognitiveHealth from './pages/categories/CognitiveHealth';
import HairLoss from './pages/categories/HairLoss';
import InjuryRecovery from './pages/categories/InjuryRecovery';
import SkinCare from './pages/categories/SkinCare';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/blog" component={Blog} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/sitemap" component={Sitemap} />
        <Route path="/categories/weight-loss" component={WeightLoss} />
        <Route path="/categories/hormone-therapy" component={HormoneTherapy} />
        <Route path="/categories/anti-aging" component={AntiAging} />
        <Route path="/categories/sexual-wellness" component={SexualWellness} />
        <Route path="/categories/cognitive-health" component={CognitiveHealth} />
        <Route path="/categories/hair-loss" component={HairLoss} />
        <Route path="/categories/injury-and-recovery" component={InjuryRecovery} />
        <Route path="/categories/skin-care" component={SkinCare} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;