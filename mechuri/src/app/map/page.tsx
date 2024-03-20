import Map from '../../components/map/Map';
import NavBar from '@/components/commons/NavBar';

export default function MapPage() {
  return (
    <div className="h-screen">
      <NavBar></NavBar>
      <Map></Map>
    </div>
  );
}
