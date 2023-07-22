import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetActiveAdsQuery, useGetAllAdsQuery } from '../../api/adsApi';
import { Button } from 'react-bootstrap';
import AdCard from '../../components/ads/AdCard';
import { CgPlayListAdd } from 'react-icons/cg';
import { BsCalendar2Check } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Error from '../../components/shared/Error';
import Loading from '../../components/shared/Loading';

function AdsPage() {
  const user = useSelector((state) => state.user);
  // to get all ads or only active ones
  const [filtered, setFiltered] = useState(false);

  return (
    <>
      <section>
        {filtered ? <ActiveAds user={user} /> : <AllAds user={user} />}
      </section>
      {/* ==================== CREATE NEW AD BUTTON ==================== */}
      <section id="actions" className="container ">
        <Link
          to="/ads/new"
          className="create-ad-btn btn btn-primary rounded-4 position-fixed z-3 shadow-lg rounded-full px-2 py-2 d-flex align-items-center">
          <CgPlayListAdd className="display-5 font-bold  mx-2" />
          <span className="fs-5">Create a new ad</span>
        </Link>
      </section>
      {/* ==================== GET ALL ADS / ACTIVE ADS BUTTON ==================== */}
      <section id="filters" className="container ">
        <Button
          variant={filtered ? 'primary' : 'secondary'}
          className="filter-ads-btn rounded-4 position-fixed z-3 shadow-lg rounded-full px-2 py-2 d-flex align-items-center"
          onClick={() => setFiltered((prev) => !prev)}>
          <BsCalendar2Check className="display-5 font-bold  mx-2 d-none d-md-block" />
          <span className="fs-5">{filtered ? 'All ads' : 'Active only'}</span>
        </Button>
      </section>
    </>
  );
}

export default AdsPage;

function ActiveAds({ user }) {
  const {
    data: activeAds,
    isLoading,
    error,
  } = useGetActiveAdsQuery(user.token);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div
          className={`grid-container ${
            activeAds.data.data.length > 4 ? 'large-grid' : 'small-grid'
          }`}>
          {activeAds.data.data.map((ad, index) => (
            <AdCard ad={ad} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

function AllAds({ user }) {
  const { data: allAds, isLoading, error } = useGetAllAdsQuery(user.token);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div
          className={`grid-container ${
            allAds.data.data.length > 4 ? 'large-grid' : 'small-grid'
          }`}>
          {allAds.data.data.map((ad, index) => (
            <AdCard ad={ad} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
