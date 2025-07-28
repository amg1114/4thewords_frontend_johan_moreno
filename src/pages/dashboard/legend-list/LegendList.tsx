import LegendCard from '@components/cards/LegendCard';
import StyledInput from '@components/forms/StyledInput';
import StyledSelect from '@components/forms/StyledSelect';
import useDashboard from '@hooks/useDashboard';
import type { Legend } from '@models/legend.interface';
import { useDashboardFilters } from './_hooks/useDashboardFilters';
import StyledButton from '@components/StyledButton';

export function LegendList() {
  const {
    data: { categories, provinces, cantons, districts, isLoading },
    legends,
    fetchLegends,
  } = useDashboard();
  const { register, handleSubmit } = useDashboardFilters();
  return (
    <section className="py-6">
      <h1 className="mb-6 text-2xl font-semibold">Legend List</h1>

      <form className="flex flex-wrap gap-3" onSubmit={handleSubmit}>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-3">
            <StyledInput {...register('name')} type="text" label="Search" placeholder="Search legends..." />
          </div>
          <div className="col-span-full flex gap-2 lg:col-span-1">
            <div className="flex-1">
              <StyledInput {...register('from')} type="date" label="From" placeholder="1999-01-01" />
            </div>

            <div className="flex-1">
              <StyledInput {...register('to')} type="date" label="To" placeholder="2025-01-01" />
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <StyledSelect {...register('province_id')} label="Provinces">
            <option value="">All provinces</option>
            {/* Map through provinces to create options */}
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('canton_id')} label="Cantons">
            <option value="">All canton</option>
            {/* Map through canton to create options */}
            {cantons.map((canton) => (
              <option key={canton.id} value={canton.id}>
                {canton.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('district_id')} label="Districts">
            <option value="">All districts</option>
            {/* Map through districts to create options */}
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect {...register('category_id')} label="Categories">
            <option value="">All Categories</option>
            {/* Map through categories to create options */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </StyledSelect>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <StyledButton className="w-fit" type="submit">
            Search
          </StyledButton>
          <StyledButton className="w-fit" type="reset" variant="secondary" onClick={() => fetchLegends({})}>
            Reset
          </StyledButton>
        </div>
      </form>

      {isLoading && <p className="mt-3">Loading legends...</p>}
      {!isLoading && legends.length === 0 && <p className="mt-3">No legends available.</p>}

      <div className="grid grid-cols-1 gap-4 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {legends.map((legend: Legend) => (
          <LegendCard key={'legend' + legend.id} legend={legend} />
        ))}
      </div>
    </section>
  );
}
