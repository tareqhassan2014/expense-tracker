import { default as API } from '../store/apiSlice';
import { getSome } from './helper/helper';

const Labels = () => {
    const { data, isError, isSuccess, isFetching } = API.useGetLabelsQuery();

    let Transaction;
    

    if (isFetching) {
        Transaction = <div>Loading....</div>;
    } else if (isSuccess) {
        getSome(data);
        Transaction = data.map((data, index) => (
            <LabelsComponent data={data} key={index} />
        ));
    } else if (isError) {
        Transaction = <div>Error</div>;
    }

    return <>{Transaction} </>;
};

const LabelsComponent = ({ data }) => {
    if (!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div
                    className="w-2 h-2 rounded py-3"
                    style={{ background: data.color ?? '#f9c74f' }}
                ></div>
                <h3 className="text-md">{data.type ?? ''}</h3>
            </div>
            <h3 className="font-bold">{data.percent ?? 0}</h3>
        </div>
    );
};

export default Labels;
