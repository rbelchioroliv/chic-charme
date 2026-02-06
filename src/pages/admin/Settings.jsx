import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { useLayoutStore } from '../../store/useLayoutStore';

// Componente de Item Arrastável
const SortableItem = ({ id, section, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between mb-3 group hover:border-brand/50 transition-colors">
      <div className="flex items-center gap-4">
        {/* Alça de arrastar */}
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-brand">
          <GripVertical size={20} />
        </button>
        <span className="font-medium text-dark-900">{section.label}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${section.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {section.active ? 'Visível' : 'Oculto'}
        </span>
        <button 
          onClick={() => onToggle(section.id)}
          className="p-2 text-gray-400 hover:text-brand hover:bg-gray-50 rounded-full transition-colors"
        >
          {section.active ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const { sections, setSections, toggleSection } = useLayoutStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-3xl font-serif font-bold text-dark-900 mb-2">Editor de Layout</h1>
      <p className="text-gray-500 mb-8">Arraste as seções para mudar a ordem na Home Page ou clique no olho para ocultar.</p>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
              <SortableItem key={section.id} id={section.id} section={section} onToggle={toggleSection} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
        <strong>Dica:</strong> As alterações são salvas automaticamente e refletem na Home Page em tempo real.
      </div>
    </div>
  );
};

export default Settings;