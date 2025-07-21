import React from 'react'

const ActionModal = ({ isOpen, onClose, onConfirm, actionData }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">Log This Action?</h2>
        <p className="mb-4 text-gray-600">
          Are you sure you want to log <strong>{actionData?.title}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(actionData)
              onClose()
            }}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionModal
