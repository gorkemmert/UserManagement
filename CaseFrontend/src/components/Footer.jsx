import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full bg-[#295F98] text-gray-400 py-8 px-2 fixed bottom-0 left-0 right-0 z-50">
      {/* <div className="max-w-[1240px] mx-auto grid grid-cols-2 border-b-2 border-gray-600 py-8">
        <div>
          <h6 className='font-bold uppercase py-2'>Solutions</h6>
          <ol>
            <li className='py-1'>Web Aplications</li>
            <li className='py-1'>Mobil Aplications</li>
            <li className='py-1'>Project Management</li>
          </ol>
        </div>
        <div>
          <h6 className='font-bold uppercase py-2'>Solutions</h6>
          <ol>
            <li className='py-1'>Web Aplications</li>
            <li className='py-1'>Mobil Aplications</li>
            <li className='py-1'>Project Management</li>
          </ol>
        </div>
      </div> */}

      <div className='flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center'>
        <p>2024 Gorkem Mert Frontend Developer</p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl gap-2'>
          <FaFacebook />
          <FaGithub />
          <FaInstagram />
          <FaTwitch />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
