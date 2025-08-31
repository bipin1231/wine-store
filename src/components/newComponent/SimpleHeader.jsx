import {
  Wine,
  ArrowLeft,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function SimpleHeader() {
  const navigate=useNavigate();
  return (
  <header className="sticky top-0 z-50 py-4 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors group"
          >
            <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="text-2xl font-bold flex items-center">
            <Wine className="text-[#a63f3f] mr-2" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </div>
                        {/* <div className="flex items-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-1 text-[#8b5a2b]" />
                Secure Payment
              </div> */}
        
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
      </header>

  
    


  )
}

export default SimpleHeader
