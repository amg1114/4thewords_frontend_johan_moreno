import { useNavigate } from 'react-router';
import useEditLegend from './_hooks/useEditLegend';
import StyledInput from '@components/forms/StyledInput';
import StyledTextarea from '@components/forms/StyledArea';
import StyledSelect from '@components/forms/StyledSelect';
import useDashboard from '@hooks/useDashboard';
import StyledButton from '@components/StyledButton';

export default function EditLegend() {
  const navigate = useNavigate();
  const { handleSubmit, onSubmit, register, errors, currentLegend } = useEditLegend();
  const {
    data: { categories, provinces, cantons, districts },
  } = useDashboard();
  return (
    <section className="mx-auto max-w-md py-6">
      <h1 className="mb-6 text-2xl font-semibold">Create Legend</h1>
      {currentLegend && (
        <>
          <img src={currentLegend.image_url} alt={currentLegend.name} />
          <p className="mb-4 text-sm text-gray-500">
            If you want to change the image, please select a new one. Otherwise, the current image will remain
            unchanged.
          </p>
        </>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <StyledInput label="Name" {...register('name')} errors={errors.name?.message} />
        <StyledTextarea label="Description" {...register('description')} errors={errors.description?.message} />
        <StyledInput type="date" label="Date" {...register('date')} errors={errors.date?.message} />
        <StyledInput
          type="file"
          label="Image"
          {...register('image')}
          errors={typeof errors.image?.message === 'string' ? errors.image.message : undefined}
          accept="image/*"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StyledSelect {...register('category_id')} label="Category" errors={errors.category_id?.message}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('province_id')} label="Province" errors={errors.province_id?.message}>
            <option value="">Select province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('canton_id')} label="Canton" errors={errors.canton_id?.message}>
            <option value="">Select canton</option>
            {cantons.map((canton) => (
              <option key={canton.id} value={canton.id}>
                {canton.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('district_id')} label="District" errors={errors.district_id?.message}>
            <option value="">Select district</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </StyledSelect>
        </div>

        <StyledButton type="submit">Update</StyledButton>
        <StyledButton type="button" variant="secondary" onClick={() => navigate('/dashboard/legends')}>
          Cancel
        </StyledButton>
      </form>
    </section>
  );
}
