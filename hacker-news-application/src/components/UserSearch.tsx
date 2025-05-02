import { useForm } from "react-hook-form"

const UserSearch: React.FC = () => {
  const userForm = useForm();

  const users = ['tptacek', 'jacquesm', 'ingve', 'todsacerdoti', 'rbanffy', 'pseudolus', 'danso', 'tosh', 'JumpCrisscross', 'Tomte', 'Animats', 'lxm', 'ColinWright', 'patio11', 'zdw', 'rayiner', 
    'dragonwriter', 'pjmlp', 'luu', 'TeMPOraL', 'ChuckMcM', 'thunderbong', 'pjc50', 'toomuchtodo', 'anigbrowl', 'steveklabnik', 'jgrahamc', 'PaulHoule', 'bookofjoe', 'walterbell', 'coldtea', 'jerf', 'userbinator',
    'signa11', 'ceejayoz', 'nostrademons', 'mooreds', 'sohkamyung', 'uptown', 'WalterBright', 'jedberg', 'crazygringo', 'jrockway', 'hn_throwaway_99', 'simonw', 'paxys', 'stavros', 'minimaxir', 'mfiguiere', 'doener',
    'wglb', 'shawndumas', 'masklinn', 'dnetesn', 'davidw', 'coloneltcb', 'robin_reala', 'jonbaer', 'Brajeshwar', 'dredmorbius', 'aaronbrethorst', 'cperciva', 'tokenadult', 'rntn', 'tyingq', 
    'belter', 'wpietri', 'saagarjha', 'fogus', 'Retric', 'adamnemecek', 'Bender', 'wallflower', 'evo_9', 'lisper', 'ryandrake', 'sp332', 'bane', 'derefr', 'btilly', 'mpweiher', 'nkurz',
    'Anon84', 'kibwen', 'brudgers', 'ilamont', 'bpierre', 'pavel_lishin', 'petercooper', 'pavlov', 'Someone1234', 'ksec', 'tzs', 'wmf', 'pabs3', 'nostromo', 'mmastrac', 'onion2k', 'DiabloD3', 'feross']

  const handleInstitutionSubmit = (values: Object) => {
    console.log(values);
  }

  return (
    <>
      <section className="mx-100 px-20 bg-slate-100 justify-start text-left">
        <form className="py-20" onSubmit={userForm.handleSubmit(handleInstitutionSubmit)}>
          <table>
            <tr>
              <label className="font-bold" htmlFor="name">Search for user</label>
            </tr>
            <tr>
              <input className="border-solid" type="text" id="name" {...userForm.register("name")} />
            </tr>
            <tr>
              <button className="bg-slate-100" type="submit">Submit</button>
            </tr>
          </table>
        </form>
      </section>
    </>
  );
};

export default UserSearch;
