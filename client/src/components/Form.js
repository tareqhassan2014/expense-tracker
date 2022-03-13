import { useForm } from 'react-hook-form';
import { default as API } from '../store/apiSlice';
import List from './List';

const Form = () => {
    const [addTransaction] = API.useAddTransactionMutation();
    const { register, handleSubmit, resetField } = useForm();
    const onSubmit = async (data) => {
        if (!data) return {};

        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount');
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className="font-bold pb-4 text-xl">Transaction</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Salary,House Rend, SIP"
                            className="form-input"
                            {...register('name')}
                        />
                    </div>
                    <select className="form-input" {...register('type')}>
                        <option value="investment" defaultValue>
                            Investment
                        </option>
                        <option value="expense">Expense</option>
                        <option value="savings">Savings</option>
                    </select>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Amount"
                            className="form-input"
                            {...register('amount')}
                        />
                    </div>
                    <div className="submit-btn">
                        <button className="border py-2 text-white bg-indigo-500 w-full">
                            Make Transaction
                        </button>
                    </div>
                </div>
            </form>
            <List />
        </div>
    );
};

export default Form;
