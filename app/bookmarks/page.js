import React from 'react';
import Image from 'next/image';
import { BookmarkIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import UnderConstruction from '../components/UnderConstruction';


const page = () => {
    return (
        <div className='mt-12'>
            <div>

                <div className='flex justify-start items-center gap-2'>
                    <div className="breadcrumbs text-sm text-gray-400">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Bookmarks</a></li>
                        </ul>
                    </div> 

                </div>
            </div>
            <div >
               <UnderConstruction></UnderConstruction>
            </div>
        </div>
    );
};

export default page;