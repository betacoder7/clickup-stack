export default function toFormData(body) {
    const formdata = new FormData();

    Object.keys(body).map((key) => {
        if (Array.isArray(body[key])) {
            for (let i = 0; i < body[key].length; i++) {
                formdata.append(`${key}[${i}]`, body[key][i]);
            }
        }
        else {
            formdata.append(key, body[key]);
        }
        return key;
    });

    return formdata;
};