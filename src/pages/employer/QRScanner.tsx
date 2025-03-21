import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Create instance of scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    // Success callback
    const success = (decodedText: string) => {
      scanner.clear();
      setScanResult(decodedText);
      setShowResult(true);
    };

    // Error callback
    const error = (err: any) => {
      console.warn(`QR Code scanning failed: ${err}`);
    };

    // Start scanning
    scanner.render(success, error);

    // Cleanup
    return () => {
      scanner.clear();
    };
  }, []);

  const handleClose = () => {
    setShowResult(false);
    setScanResult(null);
    // Reinitialize scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );
    scanner.render(
      (decodedText: string) => {
        scanner.clear();
        setScanResult(decodedText);
        setShowResult(true);
      },
      (err: any) => {
        console.warn(`QR Code scanning failed: ${err}`);
      }
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">QR Scanner</h1>
          <p className="mt-2 text-sm text-gray-700">
            Scan worker QR codes to verify their identity and process payments.
          </p>
        </div>
      </div>

      <div className="mt-8">
        {/* QR Scanner */}
        <div id="qr-reader" className="max-w-lg mx-auto" />

        {/* Result Modal */}
        {showResult && scanResult && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={handleClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        QR Code Scanned Successfully
                      </h3>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          Worker ID: {scanResult}
                        </p>
                        {/* Add more worker details here once we have API integration */}
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto"
                          onClick={handleClose}
                        >
                          Scan Another
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
