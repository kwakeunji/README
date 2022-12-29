const uploadMultipleImgAPI = async (formData) => {
  try {
    const res = await fetch(
      'https://mandarin.api.weniv.co.kr/image/uploadfiles',
      {
        method: 'POST',
        body: formData,
      },
    );
    const json = await res.json();
    if (json.message) {
      // eslint-disable-next-line no-alert
      alert(`${json.message}`);
    }
    const imgUrlArr = json.map(
      (item) => `https://mandarin.api.weniv.co.kr/${item.filename}`,
    );
    return imgUrlArr;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadMultipleImgAPI;
