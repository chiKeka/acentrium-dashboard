

export default function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mb-8">
      <div className="text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-black bg-opacity-30 rounded-lg flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
            <span className="text-gray-600 font-bold text-3xl relative z-10">A</span>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transformOrigin: '0 0',
                      transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-10px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Acentrium Africa</h1>
            <p className="text-blue-100 text-lg">Impact Dashboard</p>
          </div>
        </div>
        
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold mb-3">
            Building Africa's AI Ecosystem: Education, Innovation, Impact
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Acentrium Africa drives continental AI growth through advanced education, cutting-edge research, 
            and strategic partnerships, fostering innovation and sustainable technological impact across Africa.
          </p>
        </div>

        {/* Key Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">2,847</div>
            <div className="text-white text-sm font-medium">Students Trained</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">18</div>
            <div className="text-white text-sm font-medium">Countries Reached</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-white text-sm font-medium">Research Projects</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-white text-sm font-medium">Partners</div>
          </div>
        </div>
      </div>
    </div>
  );
}
