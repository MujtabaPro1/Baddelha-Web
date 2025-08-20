import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings, 
  Shield,
  Star,
  Car,
  Zap,
  FileText,
  Check
} from 'lucide-react';
import axiosInstance from '../services/axiosInstance';
import { inspectionData, numberWithCommas } from '../lib/utils';
import CarBodySvgView from '../components/CarBodyView';




const CarDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'inspection' | 'financing'>('overview');
  const [showContactForm, setShowContactForm] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [inspectionDetails,setInspectionDetails] = useState(null);
  const [inspectionSchema,setInspectionSchema] = useState(null);



  const nextImage = () => {
    const imagesArray = images.length > 0 ? images : [];
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = () => {
    const imagesArray = images.length > 0 ? images : [];
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };



   useEffect(()=>{
      // Extract car ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id') || window.location.pathname.split('/').pop();
      
      if (id) {
         carDetails(id);
      }
   },[]);

   const carDetails = (id: any) => {
          axiosInstance.get('/api/1.0/car/car-details/' + id).then((res)=>{
              // Process car data
              let _car = res?.data?.car;
              let _inspectionData = inspectionData;
              
              // Process inspection data if available
              if(_car['Inspection']){
                  _car['InspectionData'] = _car?.Inspection?.[0]?.inspectionJson;
                  _inspectionData.map((i)=>{
                      i.fields.map((_i: any)=>{
                          Object.keys(_car['InspectionData']).map((cKey)=>{
                              if(cKey.replace(/_/g, " ") == _i.fieldName){
                                  if(cKey == 'Warranty_Valid_Till'){
                                      _i.value = _car['InspectionData'][cKey] ? new Date(_car['InspectionData'][cKey]).toDateString() : 'N/A';
                                  }
                                  else if(cKey == 'Service_Plan_Valid_Till'){
                                      _i.value = _car['InspectionData'][cKey] ? new Date(_car['InspectionData'][cKey]).toDateString(): 'N/A';
                                  }
                                  else{
                                      _i.value = _car['InspectionData'][cKey] ;
                                  }
                              }
                          })
                      })
                      i['isHidden'] = i.name != 'General Information';
  
                      if(_car['InspectionData'].overview){
                          i['overview'] = _car['InspectionData'].overview[i.name];
                      }
                  })
              }
              _car['InspectionData'] = _inspectionData;
              
              // Set car data
              setCar(_car);

              setInspectionDetails(res?.data?.car?.Inspection?.[0]);
              setInspectionSchema(res?.data?.car?.Inspection?.[0]?.inspectionJson);
              
              // Process images
              if (res?.data?.images && res.data.images.length > 0) {
                  // Reorder images if needed
                  const imageUrls = res.data.images.map((img: any) => img.url || img.imageUrl || img);
                  setImages(imageUrls);
              } else if (_car.images && _car.images.length > 0) {
                  // Use car images if available
                  setImages(_car.images);
              }
              
              // Process car videos if available
              if (res?.data?.carImages) {
                  const videos = res.data.carImages.filter((i: any) => i.fileType && i.fileType.includes('video'));
                  if (videos.length > 0) {
                      // Handle videos if needed
                      console.log('Videos available:', videos.length);
                  }
              }
          }).catch((err)=>{
              console.log('err',err);
          })
      };


 
      if(!car || !inspectionDetails || !inspectionSchema){
        return <div>Loading...</div>
      }


  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/buy" className="hover:text-[#f78f37] transition">Cars for Sale</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/buy" className="hover:text-[#f78f37] transition">{car?.make}</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{car?.model}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Slider */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={images.length > 0 ? images[currentImageIndex] : car?.images[currentImageIndex]}
                  alt={car ? `${car.year || ''} ${car.make || ''} ${car.model || ''}` : `${car?.year} ${car?.make} ${car?.model}`}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length > 0 ? images.length : 0}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {(images.length > 0 ? images : []).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                        index === currentImageIndex ? 'border-[#f78f37]' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car ? `${car.year || ''} ${car.make || ''} ${car.model || ''}` : `${car?.year} ${car?.make} ${car?.model}`}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {car?.location || car?.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {car?.condition || car?.condition}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#3d3d40]">
                    SAR {numberWithCommas(car?.bookValue)}
                  </div>
    
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Settings className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.mileage ? car.mileage.toLocaleString() : '0'} km</div>
                  <div className="text-sm text-gray-600">Mileage</div>
                </div>
                <div className="text-center">
                  <Fuel className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.fuelType || 'Petrol'}</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                </div>
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.transmission || 'Automatic'}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
                <div className="text-center">
                  <Car className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.bodyType}</div>
                  <div className="text-sm text-gray-600">Body Type</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: FileText },
                    { id: 'features', label: 'Features', icon: Star },
                    { id: 'inspection', label: 'Inspection', icon: Shield },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition ${
                        activeTab === id
                          ? 'border-[#f78f37] text-[#f78f37]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{car?.description || ""}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Specifications</h3>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Vehicle Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>VIN:</span>
                            <span className="font-mono">{car?.vin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exterior Color:</span>
                            <span>{car?.exteriorColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interior Color:</span>
                            <span>{car?.interiorColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Drivetrain:</span>
                            <span>{car?.drivetrain}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Warranty</h4>
                        <p className="text-sm text-gray-700">{car?.warranty}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Comfort & Convenience</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {car?.features?.comfort && Array.isArray(car.features.comfort) ? (
                          car.features.comfort.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))
                        ) : <></>}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Safety & Security</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {car?.features?.safety && Array.isArray(car.features.safety) ? (
                          car.features.safety.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))
                        ) : <></>}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Technology</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {car?.features?.technology && Array.isArray(car.features.technology) ? (
                          car.features.technology.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))
                        ) : <></>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Inspection Tab */}
                {activeTab === 'inspection' && (
                   <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                   <div className="px-4 py-5 sm:px-6">
                     <h3 className="text-lg leading-6 font-medium text-gray-900">Inspection Report</h3>
                     <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed inspection information.</p>
                   </div>
                   
                   {!inspectionDetails?.inspectionJson ? (
                     <div className="px-4 py-5 sm:px-6 text-center">
                       <p className="text-gray-500">No inspection report available for this car.</p>
                     </div>
                   ) : !inspectionSchema ? (
                     <div className="px-4 py-5 sm:px-6 flex justify-center">
                       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
                     </div>
                   ) : (
                     <div className="border-t border-gray-200">
                       {/* Inspection Progress Overview */}
                       <div className="px-4 py-5 sm:px-6">
                         <h4 className="text-md font-medium text-gray-900 mb-4">Inspection Overview</h4>
                     
                         <div className={"grid grid-cols-1 gap-4 bg-white p-2"}>
                     <div >
                       <div className={"w-full p-4 rounded-md bg-[#F6F9FC] font-bold  mt-2 mb-2 text-[#000] flex justify-between items-center"}>
                         <h1>Information</h1>
                       </div>
         
                       {inspectionDetails ?
                       Object.keys(inspectionDetails?.inspectionJson).map((i, index) => {
         
         
                         if(i == 'overview'){
                           return <></>;
                         }
         
                         return (
                             <div key={i + index} >
                               <div className={'w-full'}>
                                 <div className={"m-2  border-b border-b-[#F7F7F7] flex items-center justify-between"} key={i + index}>
                                   <p className={"font-bold text-[#000] mt-1 mb-1"}>{i.replace(/_/g, " ")}</p>
                                   <p className={"mt-1 mb-1"}>{typeof inspectionDetails?.inspectionJson[i] == 'object' && inspectionDetails?.inspectionJson[i]?.length ? inspectionDetails?.inspectionJson[i][0].value : typeof inspectionDetails?.inspectionJson[i] == 'object' && !inspectionDetails?.inspectionJson[i]?.length ?  inspectionDetails?.inspectionJson[i]?.value : inspectionDetails?.inspectionJson[i] == "" ? "N/A" : inspectionDetails?.inspectionJson[i]}</p>
                                 </div>
                               </div>
                             </div>
                           );
                         }) : <>
                         <p className="text-center mt-10 text-gray-500 text-lg">Loading Inspection Preview Soon .. </p>
                         </>}
                     </div>
         
                     <div >
                       <div className={"w-full p-4 rounded-md bg-[#F6F9FC] font-bold  mt-2 mb-2 text-[#000] "}>Images</div>
                       <div className="flex flex-wrap">
                         {images?.length && images?.map((img: any, index: number) => {
                           return (
                             <div key={img.caption + index}>
                               <div className={"flex flex-wrap cursor-pointer items-start justify-start"}>
                                 <div
                                   onClick={() => {
                                    
                                   }}
                                   className={"w-[120px] text-center ml-2 mr-2"}
                                 >
                                   <img className={"w-[120px] h-[100px] m-2 rounded-lg"} src={img} />
                                   <small>{img.caption}</small>
                                 </div>
                               </div>
                             </div>
                           )
                         })}
                       </div>
                       <p className="w-full p-4 rounded-md bg-[#F6F9FC] font-bold  mt-2 mb-2 text-[#000] text-lg">Car Body Condition</p>
                       {inspectionDetails?.carBodyConditionJson && <CarBodySvgView data={inspectionDetails?.carBodyConditionJson}/>}
                     </div>
                   </div>
                   </div>
                       
                      
                     </div>
                   )}
                 </div>
                )}

            
              </div>
            </div>
          </div>

          {/* Right Column - Dealer Info and Actions */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#3d3d40] mb-2">
                  SAR {numberWithCommas(car?.bookValue)}
                </div>
      
        
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = `/purchase/${car.id}`}
                  className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
                >
                  Purchase Now
                </button>
                <button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full border-2 border-[#f78f37] text-[#f78f37] hover:bg-[#f78f37] hover:text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Contact Dealer
                </button>
              </div>

         
            </div>

           

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{car?.condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-medium">{car?.bodyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Engine</span>
                  <span className="font-medium">{car?.engine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Drivetrain</span>
                  <span className="font-medium">{car?.drivetrain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{car?.fuelType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;