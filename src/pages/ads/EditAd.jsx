import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateAdMutation } from '../../api/adsApi';
import AdForm from '../../components/ads/AdForm';

function EditAd() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const [reducerState, setReducerState] = useState(state);
  const [updateAd] = useUpdateAdMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(reducerState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const token = user.token;
      const res = await updateAd({
        ad: formData,
        id: state.id,
        bearerToken: token,
      });
      console.log('res of ad update: !!!! ', res);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    setReducerState(state);
  }, []);

  return (
    <>
      <AdForm
        handleSubmit={handleSubmit}
        state={reducerState}
        setReducerState={setReducerState}
      />
    </>
  );
}

export default EditAd;
